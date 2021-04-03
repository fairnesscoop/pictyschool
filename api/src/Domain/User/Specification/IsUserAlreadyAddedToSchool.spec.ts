import { mock, instance, when, verify, anything } from 'ts-mockito';
import { School } from 'src/Domain/School/School.entity';
import { SchoolUserRepository } from 'src/Infrastructure/School/Repository/SchoolUserRepository';
import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import { User, UserRole } from '../User.entity';
import { IsUserAlreadyAddedToSchool } from './IsUserAlreadyAddedToSchool';
import { SchoolUser } from 'src/Domain/School/SchoolUser.entity';

describe('IsUserAlreadyAddedToSchool', () => {
  let school: School;
  let user: User;
  let schoolUserRepository: SchoolUserRepository;
  let isUserAlreadyAddedToSchool: IsUserAlreadyAddedToSchool;

  beforeEach(() => {
    school = mock(School);
    user = mock(User);
    schoolUserRepository = mock(SchoolUserRepository);
    isUserAlreadyAddedToSchool = new IsUserAlreadyAddedToSchool(
      instance(schoolUserRepository)
    );
  });
  
  it('testPhotographer', async () => {
    when(user.getRole()).thenReturn(UserRole.PHOTOGRAPHER);
    expect(
      await isUserAlreadyAddedToSchool.isSatisfiedBy(instance(school), instance(user))
    ).toBe(true);
    verify(schoolUserRepository.findOneByUserAndSchool(anything(), anything())).never();
  });

  it('testDirectorNotAdded', async () => {
    when(schoolUserRepository.findOneByUserAndSchool(instance(user), instance(school)))
      .thenResolve(null);

    expect(
      await isUserAlreadyAddedToSchool.isSatisfiedBy(instance(school), instance(user))
    ).toBe(false);
    verify(schoolUserRepository.findOneByUserAndSchool(instance(user), instance(school))).once();
  });

  it('testDirectorAlreadyAdded', async () => {
    when(schoolUserRepository.findOneByUserAndSchool(instance(user), instance(school)))
      .thenResolve(new SchoolUser(instance(school), instance(user)));
    expect(
      await isUserAlreadyAddedToSchool.isSatisfiedBy(instance(school), instance(user))
    ).toBe(true);
    verify(schoolUserRepository.findOneByUserAndSchool(instance(user), instance(school))).once();
  });
});
