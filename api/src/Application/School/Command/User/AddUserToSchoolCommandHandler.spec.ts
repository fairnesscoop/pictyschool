import { mock, instance, when, verify, anything, deepEqual } from 'ts-mockito';
import { School } from 'src/Domain/School/School.entity';
import { AddUserToSchoolCommandHandler } from 'src/Application/School/Command/User/AddUserToSchoolCommandHandler';
import { AddUserToSchoolCommand } from 'src/Application/School/Command/User/AddUserToSchoolCommand';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { User, UserRole } from 'src/Domain/User/User.entity';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { SchoolUserRepository } from 'src/Infrastructure/School/Repository/SchoolUserRepository';
import { SchoolUser } from 'src/Domain/School/SchoolUser.entity';
import { IsUserAlreadyAddedToSchool } from 'src/Domain/User/Specification/IsUserAlreadyAddedToSchool';
import { UserAlreadyAddedToSchoolException } from 'src/Domain/User/Exception/UserAlreadyAddedToSchoolException';
import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import { UserNotFoundException } from 'src/Domain/User/Exception/UserNotFoundException';

describe('AddUserToSchoolCommandHandler', () => {
  let schoolRepository: SchoolRepository;
  let userRepository: UserRepository;
  let schoolUserRepository: SchoolUserRepository;
  let isUserAlreadyAddedToSchool: IsUserAlreadyAddedToSchool;
  let school: School;
  let handler: AddUserToSchoolCommandHandler;

  const user = mock(User);
  const createdSchoolUser = mock(SchoolUser);

  const command = new AddUserToSchoolCommand(
    'ee18bf86-c72a-4ed9-a6d1-212f4286759e',
    'fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f',
  );

  beforeEach(() => {
    schoolRepository = mock(SchoolRepository);
    userRepository = mock(UserRepository);
    schoolUserRepository = mock(SchoolUserRepository);
    isUserAlreadyAddedToSchool = mock(IsUserAlreadyAddedToSchool);
    school = mock(School);

    handler = new AddUserToSchoolCommandHandler(
      instance(schoolRepository),
      instance(userRepository),
      instance(schoolUserRepository),
      instance(isUserAlreadyAddedToSchool),
    );
  });

  it('testDirectorSuccessfullyAdded', async () => {
    when(createdSchoolUser.getId()).thenReturn('0b1d9435-4258-42f1-882d-4f314f8fb57d');
    when(user.getRole()).thenReturn(UserRole.DIRECTOR);
    when(schoolRepository.findOneById('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f'))
      .thenResolve(instance(school));
    when(userRepository.findOneById('ee18bf86-c72a-4ed9-a6d1-212f4286759e'))
      .thenResolve(instance(user));
    when(isUserAlreadyAddedToSchool.isSatisfiedBy(instance(school), instance(user)))
      .thenResolve(false);
    when(schoolUserRepository.save(
      deepEqual(new SchoolUser(instance(school), instance(user)))
    )).thenResolve(instance(createdSchoolUser));

    expect(await handler.execute(command)).toBe(
      '0b1d9435-4258-42f1-882d-4f314f8fb57d'
    );

    verify(userRepository.findOneById('ee18bf86-c72a-4ed9-a6d1-212f4286759e')).once();
    verify(schoolRepository.findOneById('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f')).once();
    verify(isUserAlreadyAddedToSchool.isSatisfiedBy(instance(school), instance(user))).once();
    verify(schoolUserRepository.save(
      deepEqual(new SchoolUser(instance(school), instance(user)))
    )).once();
  });

  it('testSchoolNotFound', async () => {
    when(schoolRepository.findOneById('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f'))
      .thenResolve(null);
    when(userRepository.findOneById('ee18bf86-c72a-4ed9-a6d1-212f4286759e'))
      .thenResolve(instance(user));
    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolNotFoundException);
      expect(e.message).toBe('schools.errors.not_found');
      verify(userRepository.findOneById('ee18bf86-c72a-4ed9-a6d1-212f4286759e')).once();
      verify(schoolRepository.findOneById('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f')).once();
      verify(schoolUserRepository.save(anything())).never();
      verify(isUserAlreadyAddedToSchool.isSatisfiedBy(anything(), anything())).never();
    }
  });

  it('testUserNotFound', async () => {
    when(userRepository.findOneById('ee18bf86-c72a-4ed9-a6d1-212f4286759e'))
      .thenResolve(null);
    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(UserNotFoundException);
      expect(e.message).toBe('users.errors.not_found');
      verify(userRepository.findOneById('ee18bf86-c72a-4ed9-a6d1-212f4286759e')).once();
      verify(schoolRepository.findOneById('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f')).never();
      verify(schoolUserRepository.save(anything())).never();
      verify(isUserAlreadyAddedToSchool.isSatisfiedBy(anything(), anything())).never();
    }
  });

  it('testUserAlreadyAdded', async () => {
    when(userRepository.findOneById('ee18bf86-c72a-4ed9-a6d1-212f4286759e'))
      .thenResolve(instance(user));
    when(schoolRepository.findOneById('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f'))
      .thenResolve(instance(school));
    when(isUserAlreadyAddedToSchool.isSatisfiedBy(instance(school), instance(user)))
      .thenResolve(true);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(UserAlreadyAddedToSchoolException);
      verify(userRepository.findOneById('ee18bf86-c72a-4ed9-a6d1-212f4286759e')).once();
      expect(e.message).toBe('users.errors.already_assigned_to_school');
      verify(schoolRepository.findOneById('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f')).once();
      verify(schoolUserRepository.save(anything())).never();
      verify(isUserAlreadyAddedToSchool.isSatisfiedBy(instance(school), instance(user))).once();
    }
  });
});
