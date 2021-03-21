import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import { mock, instance, when, verify } from 'ts-mockito';
import { User, UserRole } from '../User.entity';
import { IsEmailAlreadyExist } from './IsEmailAlreadyExist';

describe('IsEmailAlreadyExist', () => {
  const email = 'mathieu@fairness.coop';

  let userRepository: UserRepository;
  let isEmailAlreadyExist: IsEmailAlreadyExist;

  beforeEach(() => {
    userRepository = mock(UserRepository);
    isEmailAlreadyExist = new IsEmailAlreadyExist(instance(userRepository));
  });

  it('testUserCanRegister', async () => {
    when(userRepository.findOneByEmail(email)).thenResolve(null);
    expect(await isEmailAlreadyExist.isSatisfiedBy(email)).toBe(false);
    verify(userRepository.findOneByEmail(email)).once();
  });

  it('testUserCannotRegister', async () => {
    when(userRepository.findOneByEmail(email)).thenResolve(
      new User(
        'Mathieu',
        'MARCHOIS',
        email,
        'token',
        'password',
        UserRole.PHOTOGRAPHER
      )
    );
    expect(await isEmailAlreadyExist.isSatisfiedBy(email)).toBe(true);
    verify(userRepository.findOneByEmail(email)).once();
  });
});
