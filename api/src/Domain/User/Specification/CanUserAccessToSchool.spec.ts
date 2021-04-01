import { mock, instance, when, verify, anything } from 'ts-mockito';
import { School } from 'src/Domain/School/School.entity';
import { SchoolUserRepository } from 'src/Infrastructure/School/Repository/SchoolUserRepository';
import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import { User, UserRole } from '../User.entity';
import { CanUserAccessToSchool } from './CanUserAccessToSchool';
import { SchoolUser } from 'src/Domain/School/SchoolUser.entity';

describe('CanUserAccessToSchool', () => {
  let school: School;
  let user: User;
  let userRepository: UserRepository;
  let schoolUserRepository: SchoolUserRepository;
  let canUserAccessToSchool: CanUserAccessToSchool;

  beforeEach(() => {
    school = mock(School);
    user = mock(User);
    userRepository = mock(UserRepository);
    schoolUserRepository = mock(SchoolUserRepository);
    canUserAccessToSchool = new CanUserAccessToSchool(
      instance(userRepository),
      instance(schoolUserRepository)
    );
  });

  it('testUserNotFound', async () => {
    when(userRepository.findOneById('4de3a173-834f-4a9b-8f19-2e8300bf7fb0')).thenResolve(null);
    expect(
      await canUserAccessToSchool.isSatisfiedBy(instance(school), '4de3a173-834f-4a9b-8f19-2e8300bf7fb0')
    ).toBe(false);
    verify(userRepository.findOneById('4de3a173-834f-4a9b-8f19-2e8300bf7fb0')).once();
  });
  
  it('testPhotographer', async () => {
    when(user.getRole()).thenReturn(UserRole.PHOTOGRAPHER);
    when(userRepository.findOneById('4de3a173-834f-4a9b-8f19-2e8300bf7fb0'))
      .thenResolve(instance(user));
    expect(
      await canUserAccessToSchool.isSatisfiedBy(instance(school), '4de3a173-834f-4a9b-8f19-2e8300bf7fb0')
    ).toBe(true);
    verify(userRepository.findOneById('4de3a173-834f-4a9b-8f19-2e8300bf7fb0')).once();
    verify(schoolUserRepository.findOneByUserAndSchool(anything(), anything())).never();
  });

  it('testDirectorDenied', async () => {
    when(user.getRole()).thenReturn(UserRole.DIRECTOR);
    when(userRepository.findOneById('4de3a173-834f-4a9b-8f19-2e8300bf7fb0'))
      .thenResolve(instance(user));
    when(schoolUserRepository.findOneByUserAndSchool(instance(user), instance(school)))
      .thenResolve(null);

    expect(
      await canUserAccessToSchool.isSatisfiedBy(instance(school), '4de3a173-834f-4a9b-8f19-2e8300bf7fb0')
    ).toBe(false);
    verify(userRepository.findOneById('4de3a173-834f-4a9b-8f19-2e8300bf7fb0')).once();
    verify(schoolUserRepository.findOneByUserAndSchool(instance(user), instance(school))).once();
  });

  it('testDirectorGranted', async () => {
    when(user.getRole()).thenReturn(UserRole.DIRECTOR);
    when(userRepository.findOneById('4de3a173-834f-4a9b-8f19-2e8300bf7fb0'))
      .thenResolve(instance(user));
    when(schoolUserRepository.findOneByUserAndSchool(instance(user), instance(school)))
      .thenResolve(new SchoolUser(instance(school), instance(user)));
    expect(
      await canUserAccessToSchool.isSatisfiedBy(instance(school), '4de3a173-834f-4a9b-8f19-2e8300bf7fb0')
    ).toBe(true);
    verify(userRepository.findOneById('4de3a173-834f-4a9b-8f19-2e8300bf7fb0')).once();
    verify(schoolUserRepository.findOneByUserAndSchool(instance(user), instance(school))).once();
  });
});
