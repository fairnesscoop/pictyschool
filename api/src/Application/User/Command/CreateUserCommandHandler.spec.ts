import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import { PasswordEncoderAdapter } from 'src/Infrastructure/Adapter/PasswordEncoderAdapter';
import { CreateUserCommand } from 'src/Application/User/Command/CreateUserCommand';
import { CreateUserCommandHandler } from 'src/Application/User/Command/CreateUserCommandHandler';
import { IsEmailAlreadyExist } from 'src/Domain/User/Specification/IsEmailAlreadyExist';
import { EmailAlreadyExistException } from 'src/Domain/User/Exception/EmailAlreadyExistException';
import { User, UserRole } from 'src/Domain/User/User.entity';

describe('CreatUserCommandHandler', () => {
  const email = 'mathieu@fairness.coop';
  const command = new CreateUserCommand(
    'Mathieu',
    'MARCHOIS',
    'mathieu@FAIRNESS.coop',
    'plainPassword',
    UserRole.PHOTOGRAPHER
  );

  let userRepository: UserRepository;
  let passwordEncoder: PasswordEncoderAdapter;
  let isEmailAlreadyExist: IsEmailAlreadyExist;
  let commandHandler: CreateUserCommandHandler;

  beforeEach(() => {
    userRepository = mock(UserRepository);
    passwordEncoder = mock(PasswordEncoderAdapter);
    isEmailAlreadyExist = mock(IsEmailAlreadyExist);

    commandHandler = new CreateUserCommandHandler(
      instance(userRepository),
      instance(passwordEncoder),
      instance(isEmailAlreadyExist)
    );
  });

  it('testEmailAlreadyExist', async () => {
    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(true);

    try {
      expect(await commandHandler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(EmailAlreadyExistException);
      expect(e.message).toBe('users.errors.email_already_exist');
      verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
      verify(passwordEncoder.hash('plainPassword')).never();
      verify(passwordEncoder.hash(anything())).never();
      verify(userRepository.save(anything())).never();
    }
  });

  it('testRegisterSuccess', async () => {
    const createdUser: User = mock(User);
    when(createdUser.getId()).thenReturn(
      'fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f'
    );
    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(false);
    when(passwordEncoder.hash(command.password)).thenResolve('hashPassword');
    when(
      userRepository.save(
        deepEqual(
          new User(
            'Mathieu',
            'MARCHOIS',
            'mathieu@fairness.coop',
            'hashToken',
            'hashPassword',
            UserRole.PHOTOGRAPHER
          )
        )
      )
    ).thenResolve(instance(createdUser));
    when(passwordEncoder.hash(email + command.password)).thenResolve(
      'hashToken'
    );

    expect(await commandHandler.execute(command)).toBe(
      'fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f'
    );

    verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
    verify(passwordEncoder.hash('plainPassword')).once();
    verify(passwordEncoder.hash('mathieu@fairness.coopplainPassword')).once();
    verify(
      userRepository.save(
        deepEqual(
          new User(
            'Mathieu',
            'MARCHOIS',
            'mathieu@fairness.coop',
            'hashToken',
            'hashPassword',
            UserRole.PHOTOGRAPHER
          )
        )
      )
    ).once();
    verify(createdUser.getId()).once();
  });
});
