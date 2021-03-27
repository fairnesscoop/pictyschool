import { School } from 'src/Domain/School/School.entity';
import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import { mock, instance, when, verify } from 'ts-mockito';
import { User, UserRole } from '../User.entity';
import { CanUserAccessToSchool } from './CanUserAccessToSchool';

describe('CanUserAccessToSchool', () => {
  let school: School;
  let user: User;
  let userRepository: UserRepository;
  let canUserAccessToSchool: CanUserAccessToSchool;

  beforeEach(() => {
    school = mock(School);
    user = mock(User);
    userRepository = mock(UserRepository);
    canUserAccessToSchool = new CanUserAccessToSchool(instance(userRepository));
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
  });

  it('testDirectorDenied', async () => {
    when(user.getRole()).thenReturn(UserRole.DIRECTOR);
    when(userRepository.findOneById('4de3a173-834f-4a9b-8f19-2e8300bf7fb0'))
      .thenResolve(instance(user));
    expect(
      await canUserAccessToSchool.isSatisfiedBy(instance(school), '4de3a173-834f-4a9b-8f19-2e8300bf7fb0')
    ).toBe(false);
    verify(userRepository.findOneById('4de3a173-834f-4a9b-8f19-2e8300bf7fb0')).once();
  });

  it('testDirectorGranted', async () => {
    when(school.getDirector()).thenReturn(instance(user));
    when(user.getId()).thenReturn('4de3a173-834f-4a9b-8f19-2e8300bf7fb0');
    when(user.getRole()).thenReturn(UserRole.DIRECTOR);
    when(userRepository.findOneById('4de3a173-834f-4a9b-8f19-2e8300bf7fb0'))
      .thenResolve(instance(user));
    expect(
      await canUserAccessToSchool.isSatisfiedBy(instance(school), '4de3a173-834f-4a9b-8f19-2e8300bf7fb0')
    ).toBe(true);
    verify(userRepository.findOneById('4de3a173-834f-4a9b-8f19-2e8300bf7fb0')).once();
  });
});
