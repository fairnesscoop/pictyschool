import { mock, instance, when, verify, anything } from 'ts-mockito';
import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import { UserLoginQueryHandler } from 'src/Application/User/Query/UserLoginQueryHandler';
import { PasswordEncoderAdapter } from 'src/Infrastructure/Adapter/PasswordEncoderAdapter';
import { UserLoginQuery } from 'src/Application/User/Query/UserLoginQuery';
import { PasswordNotMatchException } from 'src/Domain/User/Exception/PasswordNotMatchException';
import { UserView } from 'src/Application/User/View/UserView';
import { UserNotFoundException } from 'src/Domain/User/Exception/UserNotFoundException';
import { User, UserRole } from 'src/Domain/User/User.entity';

describe('UserLoginQueryHandler', () => {
  const email = 'mathieu@fairness.coop';
  const query = new UserLoginQuery('mathieu@FAIRNESS.coop', 'plainPassword');

  let userRepository: UserRepository;
  let passwordEncoder: PasswordEncoderAdapter;
  let queryHandler: UserLoginQueryHandler;

  beforeEach(() => {
    userRepository = mock(UserRepository);
    passwordEncoder = mock(PasswordEncoderAdapter);
    queryHandler = new UserLoginQueryHandler(
      instance(userRepository),
      instance(passwordEncoder)
    );
  });

  it('testUserNotFound', async () => {
    when(userRepository.findOneByEmail(email)).thenResolve(null);

    try {
      expect(await queryHandler.execute(query)).toBeUndefined();
    } catch (e) {
      expect(e.message).toBe('users.errors.not_found');
      expect(e).toBeInstanceOf(UserNotFoundException);
      verify(userRepository.findOneByEmail(email)).once();
      verify(passwordEncoder.compare(anything(), anything())).never();
    }
  });

  it('testPasswordNotMatch', async () => {
    const user = mock(User);
    when(passwordEncoder.compare('hash', 'plainPassword')).thenResolve(false);
    when(userRepository.findOneByEmail(email)).thenResolve(instance(user));
    when(user.getPassword()).thenReturn('hash');

    try {
      expect(await queryHandler.execute(query)).toBeUndefined();
    } catch (e) {
      expect(e.message).toBe('users.errors.password_not_match');
      expect(e).toBeInstanceOf(PasswordNotMatchException);
      verify(userRepository.findOneByEmail(email)).once();
      verify(passwordEncoder.compare('hash', 'plainPassword')).once();
      verify(user.getPassword()).once();
    }
  });

  it('testLoginSuccess', async () => {
    const user = mock(User);
    when(userRepository.findOneByEmail(email)).thenResolve(instance(user));
    when(passwordEncoder.compare('hash', 'plainPassword')).thenResolve(true);
    when(user.getId()).thenReturn('14984335-f5aa-402a-a170-5393bb954538');
    when(user.getFirstName()).thenReturn('Mathieu');
    when(user.getLastName()).thenReturn('MARCHOIS');
    when(user.getEmail()).thenReturn(email);
    when(user.getPassword()).thenReturn('hash');
    when(user.getApiToken()).thenReturn('apiToken');
    when(user.getRole()).thenReturn(UserRole.PHOTOGRAPHER);

    expect(await queryHandler.execute(query)).toMatchObject(
      new UserView(
        '14984335-f5aa-402a-a170-5393bb954538',
        'Mathieu',
        'MARCHOIS',
        email,
        UserRole.PHOTOGRAPHER,
        'apiToken'
      )
    );

    verify(userRepository.findOneByEmail(email)).once();
    verify(passwordEncoder.compare('hash', 'plainPassword')).once();
    verify(user.getId()).once();
    verify(user.getFirstName()).once();
    verify(user.getLastName()).once();
    verify(user.getEmail()).once();
    verify(user.getRole()).once();
    verify(user.getPassword()).once();
    verify(user.getApiToken()).once();
  });
});
