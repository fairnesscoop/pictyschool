import { mock, instance, when, verify, anything, deepEqual } from 'ts-mockito';
import { School } from 'src/Domain/School/School.entity';
import { AssignUserToSchoolCommandHandler } from 'src/Application/School/Command/User/AssignUserToSchoolCommandHandler';
import { AssignUserToSchoolCommand } from 'src/Application/School/Command/User/AssignUserToSchoolCommand';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import { User, UserRole } from 'src/Domain/User/User.entity';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { UserNotFoundException } from 'src/Domain/User/Exception/UserNotFoundException';
import { SchoolUserRepository } from 'src/Infrastructure/School/Repository/SchoolUserRepository';
import { SchoolUser } from 'src/Domain/School/SchoolUser.entity';
import { IsUserAlreadyAssignedToSchool } from 'src/Domain/User/Specification/IsUserAlreadyAssignedToSchool';
import { UserAlreadyAssignedToSchoolException } from 'src/Domain/User/Exception/UserAlreadyAssignedToSchoolException';

describe('AssignUserToSchoolCommandHandler', () => {
  let schoolRepository: SchoolRepository;
  let schoolUserRepository: SchoolUserRepository;
  let userRepository: UserRepository;
  let isUserAlreadyAssignedToSchool: IsUserAlreadyAssignedToSchool;
  let school: School;
  let user: User;
  let handler: AssignUserToSchoolCommandHandler;

  const createdSchoolUser = mock(SchoolUser);

  const command = new AssignUserToSchoolCommand(
    'df8910f9-ac0a-412b-b9a8-dbf299340abc',
    'fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f',
  );

  beforeEach(() => {
    schoolRepository = mock(SchoolRepository);
    schoolUserRepository = mock(SchoolUserRepository);
    userRepository = mock(UserRepository);
    isUserAlreadyAssignedToSchool = mock(IsUserAlreadyAssignedToSchool);
    school = mock(School);
    user = mock(User);

    handler = new AssignUserToSchoolCommandHandler(
      instance(schoolRepository),
      instance(schoolUserRepository),
      instance(userRepository),
      instance(isUserAlreadyAssignedToSchool),
    );
  });

  it('testDirectorSuccessfullyAssigned', async () => {
    when(createdSchoolUser.getId()).thenReturn('0b1d9435-4258-42f1-882d-4f314f8fb57d');
    when(user.getRole()).thenReturn(UserRole.DIRECTOR);
    when(schoolRepository.findOneById('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f'))
      .thenResolve(instance(school));
    when(userRepository.findOneById('df8910f9-ac0a-412b-b9a8-dbf299340abc'))
      .thenResolve(instance(user));
    when(isUserAlreadyAssignedToSchool.isSatisfiedBy(instance(school), instance(user)))
      .thenResolve(false);
    when(schoolUserRepository.save(
      deepEqual(new SchoolUser(instance(school), instance(user)))
    )).thenResolve(instance(createdSchoolUser));

    expect(await handler.execute(command)).toBe(
      '0b1d9435-4258-42f1-882d-4f314f8fb57d'
    );

    verify(schoolRepository.findOneById('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f')).once();
    verify(userRepository.findOneById('df8910f9-ac0a-412b-b9a8-dbf299340abc')).once();
    verify(isUserAlreadyAssignedToSchool.isSatisfiedBy(instance(school), instance(user))).once();
    verify(schoolUserRepository.save(
      deepEqual(new SchoolUser(instance(school), instance(user)))
    )).once();
  });

  it('testSchoolNotFound', async () => {
    when(schoolRepository.findOneById('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f'))
      .thenResolve(null);
    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolNotFoundException);
      expect(e.message).toBe('schools.errors.not_found');
      verify(schoolRepository.findOneById('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f')).once();
      verify(userRepository.findOneById(anything())).never();
      verify(schoolUserRepository.save(anything())).never();
      verify(isUserAlreadyAssignedToSchool.isSatisfiedBy(anything(), anything())).never();
    }
  });

  it('testUserNotFound', async () => {
    when(schoolRepository.findOneById('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f'))
      .thenResolve(instance(school));
    when(userRepository.findOneById('df8910f9-ac0a-412b-b9a8-dbf299340abc'))
      .thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(UserNotFoundException);
      expect(e.message).toBe('users.errors.not_found');
      verify(schoolRepository.findOneById('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f')).once();
      verify(userRepository.findOneById('df8910f9-ac0a-412b-b9a8-dbf299340abc')).once();
      verify(schoolUserRepository.save(anything())).never();
      verify(isUserAlreadyAssignedToSchool.isSatisfiedBy(anything(), anything())).never();
    }
  });

  it('testUserAlreadyAssigned', async () => {
    when(schoolRepository.findOneById('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f'))
      .thenResolve(instance(school));
    when(userRepository.findOneById('df8910f9-ac0a-412b-b9a8-dbf299340abc'))
      .thenResolve(instance(user));
    when(isUserAlreadyAssignedToSchool.isSatisfiedBy(instance(school), instance(user)))
      .thenResolve(true);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(UserAlreadyAssignedToSchoolException);
      expect(e.message).toBe('users.errors.already_assigned_to_school');
      verify(schoolRepository.findOneById('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f')).once();
      verify(userRepository.findOneById('df8910f9-ac0a-412b-b9a8-dbf299340abc')).once();
      verify(schoolUserRepository.save(anything())).never();
      verify(isUserAlreadyAssignedToSchool.isSatisfiedBy(instance(school), instance(user))).once();
    }
  });
});
