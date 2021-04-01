import { mock, instance, when, verify, anything } from 'ts-mockito';
import { School } from 'src/Domain/School/School.entity';
import { SchoolUserRepository } from 'src/Infrastructure/School/Repository/SchoolUserRepository';
import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import { User, UserRole } from '../User.entity';
import { IsUserAlreadyAssignedToSchool } from './IsUserAlreadyAssignedToSchool';
import { SchoolUser } from 'src/Domain/School/SchoolUser.entity';

describe('IsUserAlreadyAssignedToSchool', () => {
  let school: School;
  let user: User;
  let schoolUserRepository: SchoolUserRepository;
  let isUserAlreadyAssignedToSchool: IsUserAlreadyAssignedToSchool;

  beforeEach(() => {
    school = mock(School);
    user = mock(User);
    schoolUserRepository = mock(SchoolUserRepository);
    isUserAlreadyAssignedToSchool = new IsUserAlreadyAssignedToSchool(
      instance(schoolUserRepository)
    );
  });
  
  it('testPhotographer', async () => {
    when(user.getRole()).thenReturn(UserRole.PHOTOGRAPHER);
    expect(
      await isUserAlreadyAssignedToSchool.isSatisfiedBy(instance(school), instance(user))
    ).toBe(true);
    verify(schoolUserRepository.findOneByUserAndSchool(anything(), anything())).never();
  });

  it('testDirectorNotAssigned', async () => {
    when(schoolUserRepository.findOneByUserAndSchool(instance(user), instance(school)))
      .thenResolve(null);

    expect(
      await isUserAlreadyAssignedToSchool.isSatisfiedBy(instance(school), instance(user))
    ).toBe(false);
    verify(schoolUserRepository.findOneByUserAndSchool(instance(user), instance(school))).once();
  });

  it('testDirectorAlreadyAssigned', async () => {
    when(schoolUserRepository.findOneByUserAndSchool(instance(user), instance(school)))
      .thenResolve(new SchoolUser(instance(school), instance(user)));
    expect(
      await isUserAlreadyAssignedToSchool.isSatisfiedBy(instance(school), instance(user))
    ).toBe(true);
    verify(schoolUserRepository.findOneByUserAndSchool(instance(user), instance(school))).once();
  });
});
