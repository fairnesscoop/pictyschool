import { mock, instance, when, verify, anything } from 'ts-mockito';
import { School } from 'src/Domain/School/School.entity';
import { AssignDirectorToSchoolCommandHandler } from 'src/Application/School/Command/AssignDirectorToSchoolCommandHandler';
import { AssignDirectorToSchoolCommand } from 'src/Application/School/Command/AssignDirectorToSchoolCommand';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import { User, UserRole } from 'src/Domain/User/User.entity';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { UserNotFoundException } from 'src/Domain/User/Exception/UserNotFoundException';
import { UserShouldBeDirectorException } from 'src/Domain/User/Exception/UserShouldBeDirectorException';

describe('AssignDirectorToSchoolCommandHandler', () => {
  let schoolRepository: SchoolRepository;
  let userRepository: UserRepository;
  let school: School;
  let user: User;
  let handler: AssignDirectorToSchoolCommandHandler;

  const command = new AssignDirectorToSchoolCommand(
    'df8910f9-ac0a-412b-b9a8-dbf299340abc',
    'fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f',
  );

  beforeEach(() => {
    schoolRepository = mock(SchoolRepository);
    userRepository = mock(UserRepository);
    school = mock(School);
    user = mock(User);

    handler = new AssignDirectorToSchoolCommandHandler(
      instance(schoolRepository),
      instance(userRepository),
    );
  });

  it('testDirectorSuccessfullyAssigned', async () => {
    when(user.getRole()).thenReturn(UserRole.DIRECTOR);
    when(schoolRepository.findOneById('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f'))
      .thenResolve(instance(school));
    when(userRepository.findOneById('df8910f9-ac0a-412b-b9a8-dbf299340abc'))
      .thenResolve(instance(user));
    when(school.getId()).thenReturn('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f');

    expect(await handler.execute(command)).toBe(
      'fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f'
    );

    verify(schoolRepository.findOneById('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f')).once();
    verify(userRepository.findOneById('df8910f9-ac0a-412b-b9a8-dbf299340abc')).once();
    verify(schoolRepository.save(instance(school))).once();
    verify(school.updateDirector(instance(user))).once();
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
      verify(schoolRepository.save(anything())).never();
      verify(school.updateDirector(anything())).never();
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
      verify(schoolRepository.save(anything())).never();
      verify(school.updateDirector(anything())).never();
    }
  });

  it('testUserNotDirector', async () => {
    when(user.getRole()).thenReturn(UserRole.PHOTOGRAPHER);
    when(schoolRepository.findOneById('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f'))
      .thenResolve(instance(school));
    when(userRepository.findOneById('df8910f9-ac0a-412b-b9a8-dbf299340abc'))
      .thenResolve(instance(user));

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(UserShouldBeDirectorException);
      expect(e.message).toBe('users.errors.should_be_director');
      verify(schoolRepository.findOneById('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f')).once();
      verify(userRepository.findOneById('df8910f9-ac0a-412b-b9a8-dbf299340abc')).once();
      verify(schoolRepository.save(anything())).never();
      verify(school.updateDirector(anything())).never();
    }
  });
});
