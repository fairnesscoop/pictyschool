import { mock, instance, when, verify, anything, anyString } from 'ts-mockito';
import { PasswordEncoderAdapter } from 'src/Infrastructure/Adapter/PasswordEncoderAdapter';
import { UpdateProfileCommandHandler } from './UpdateProfileCommandHandler';
import { UpdateProfileCommand } from './UpdateProfileCommand';
import { IsEmailAlreadyExist } from 'src/Domain/User/Specification/IsEmailAlreadyExist';
import { PhotographerRepository } from 'src/Infrastructure/User/Repository/PhotographerRepository';
import { Photographer } from 'src/Domain/User/Photographer.entity';
import { EmailAlreadyExistException } from 'src/Domain/User/Exception/EmailAlreadyExistException';

describe('UpdateProfileCommandHandler', () => {
  const email = 'mathieu@fairness.coop';

  let photographerRepository: PhotographerRepository;
  let passwordEncoder: PasswordEncoderAdapter;
  let isEmailAlreadyExist: IsEmailAlreadyExist;
  let commandHandler: UpdateProfileCommandHandler;

  beforeEach(() => {
    photographerRepository = mock(PhotographerRepository);
    passwordEncoder = mock(PasswordEncoderAdapter);
    isEmailAlreadyExist = mock(IsEmailAlreadyExist);

    commandHandler = new UpdateProfileCommandHandler(
      instance(photographerRepository),
      instance(passwordEncoder),
      instance(isEmailAlreadyExist)
    );
  });

  it('testEmailAlreadyExist', async () => {
    const photographer = mock(Photographer);
    const command = new UpdateProfileCommand(
      instance(photographer),
      'Mathieu',
      'Marchois',
      'mathieu@FAIRNESS.coop'
    );

    when(photographer.getEmail()).thenReturn('mathieu.marchois@fairess.coop');
    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(true);

    try {
      await commandHandler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(EmailAlreadyExistException);
      expect(e.message).toBe('users.errors.email_already_exist');
      verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
      verify(passwordEncoder.hash(anything())).never();
      verify(photographerRepository.save(anything())).never();
    }
  });

  it('testUpdateWithoutPassword', async () => {
    const photographer = mock(Photographer);
    const command = new UpdateProfileCommand(
      instance(photographer),
      'Mathieu',
      'Marchois',
      'mathieu@FAIRNESS.coop'
    );

    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(false);

    // Command return nothing
    expect(await commandHandler.execute(command)).toBeUndefined();

    verify(photographer.update('Mathieu', 'Marchois', 'mathieu@fairness.coop')).once();
    verify(
      photographer.update('Mathieu', 'Marchois', 'mathieu@fairness.coop')
    ).calledBefore(photographerRepository.save(instance(photographer)));
    verify(photographer.updatePassword(anyString())).never();
    verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
    verify(photographerRepository.save(instance(photographer))).once();
  });

  it('testUpdateWithPassword', async () => {
    const photographer = mock(Photographer);
    const command = new UpdateProfileCommand(
      instance(photographer),
      'Mathieu',
      'Marchois',
      'mathieu@FAIRNESS.coop',
      'azerty'
    );

    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(false);
    when(passwordEncoder.hash('azerty')).thenResolve('azertyCrypted');

    // Command return nothing
    expect(await commandHandler.execute(command)).toBeUndefined();

    verify(photographer.update('Mathieu', 'Marchois', 'mathieu@fairness.coop')).once();
    verify(photographer.updatePassword('azertyCrypted')).once();
    verify(photographer.updatePassword('azertyCrypted')).calledBefore(
      photographerRepository.save(instance(photographer))
    );
    verify(passwordEncoder.hash('azerty')).once();
    verify(
      photographer.update('Mathieu', 'Marchois', 'mathieu@fairness.coop')
    ).calledBefore(photographerRepository.save(instance(photographer)));
    verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
    verify(photographerRepository.save(instance(photographer))).once();
  });
});
