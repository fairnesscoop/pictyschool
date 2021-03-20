import { mock, instance, when, verify, anything, anyString } from 'ts-mockito';
import { PasswordEncoderAdapter } from 'src/Infrastructure/Adapter/PasswordEncoderAdapter';
import { UpdateProfileCommandHandler } from './UpdateProfileCommandHandler';
import { UpdateProfileCommand } from './UpdateProfileCommand';
import { IsEmailAlreadyExist } from 'src/Domain/User/Specification/IsEmailAlreadyExist';
import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import { User } from 'src/Domain/User/User.entity';
import { EmailAlreadyExistException } from 'src/Domain/User/Exception/EmailAlreadyExistException';
import { UserNotFoundException } from 'src/Domain/User/Exception/UserNotFoundException';

describe('UpdateProfileCommandHandler', () => {
  const email = 'mathieu@fairness.coop';
  const user = mock(User);
  const command = new UpdateProfileCommand(
    '2bd10a90-ad92-47f7-9004-c0a493ed1e13',
    'Mathieu',
    'Marchois',
    'mathieu@FAIRNESS.coop'
  );

  let userRepository: UserRepository;
  let passwordEncoder: PasswordEncoderAdapter;
  let isEmailAlreadyExist: IsEmailAlreadyExist;
  let commandHandler: UpdateProfileCommandHandler;

  beforeEach(() => {
    userRepository = mock(UserRepository);
    passwordEncoder = mock(PasswordEncoderAdapter);
    isEmailAlreadyExist = mock(IsEmailAlreadyExist);

    commandHandler = new UpdateProfileCommandHandler(
      instance(userRepository),
      instance(passwordEncoder),
      instance(isEmailAlreadyExist)
    );
  });

  it('testUserNotFound', async () => {
    when(userRepository.findOneById('2bd10a90-ad92-47f7-9004-c0a493ed1e13'))
      .thenResolve(null);

    try {
      expect(await commandHandler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(UserNotFoundException);
      expect(e.message).toBe('users.errors.not_found');
      verify(isEmailAlreadyExist.isSatisfiedBy(anything())).never();
      verify(userRepository.findOneById('2bd10a90-ad92-47f7-9004-c0a493ed1e13')).once();
      verify(passwordEncoder.hash(anything())).never();
      verify(userRepository.save(anything())).never();
    }
  });

  it('testEmailAlreadyExist', async () => {
    when(userRepository.findOneById('2bd10a90-ad92-47f7-9004-c0a493ed1e13'))
      .thenResolve(instance(user));
    when(user.getEmail()).thenReturn('mathieu.marchois@fairess.coop');
    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(true);

    try {
      expect(await commandHandler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(EmailAlreadyExistException);
      expect(e.message).toBe('users.errors.email_already_exist');
      verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
      verify(userRepository.findOneById('2bd10a90-ad92-47f7-9004-c0a493ed1e13')).once();
      verify(passwordEncoder.hash(anything())).never();
      verify(userRepository.save(anything())).never();
    }
  });

  it('testUpdateWithoutPassword', async () => {
    when(userRepository.findOneById('2bd10a90-ad92-47f7-9004-c0a493ed1e13'))
      .thenResolve(instance(user));
    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(false);

    // Command return nothing
    expect(await commandHandler.execute(command)).toBeUndefined();

    verify(user.update('Mathieu', 'Marchois', 'mathieu@fairness.coop')).once();
    verify(
      user.update('Mathieu', 'Marchois', 'mathieu@fairness.coop')
    ).calledBefore(userRepository.save(instance(user)));
    verify(user.updatePassword(anyString())).never();
    verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
    verify(userRepository.save(instance(user))).once();
  });

  it('testUpdateWithPassword', async () => {
    const user2 = mock(User);
    when(userRepository.findOneById('a90-ad92-47f7-9004-c0a493ed1e13'))
      .thenResolve(instance(user2));
    const command2 = new UpdateProfileCommand(
      'a90-ad92-47f7-9004-c0a493ed1e13',
      'Mathieu',
      'Marchois',
      'mathieu@FAIRNESS.coop',
      'azerty'
    );

    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(false);
    when(passwordEncoder.hash('azerty')).thenResolve('azertyCrypted');

    expect(await commandHandler.execute(command2)).toBeUndefined();

    verify(user2.update('Mathieu', 'Marchois', 'mathieu@fairness.coop')).once();
    verify(user2.updatePassword('azertyCrypted')).once();
    verify(userRepository.findOneById('a90-ad92-47f7-9004-c0a493ed1e13')).once();
    verify(user2.updatePassword('azertyCrypted')).calledBefore(
      userRepository.save(instance(user2))
    );
    verify(passwordEncoder.hash('azerty')).once();
    verify(
      user2.update('Mathieu', 'Marchois', 'mathieu@fairness.coop')
    ).calledBefore(userRepository.save(instance(user2)));
    verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
    verify(userRepository.save(instance(user2))).once();
  });
});
