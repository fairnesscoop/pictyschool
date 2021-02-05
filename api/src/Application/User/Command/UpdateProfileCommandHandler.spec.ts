import { mock, instance, when, verify, anything, anyString } from 'ts-mockito';
import { PasswordEncoderAdapter } from 'src/Infrastructure/Adapter/PasswordEncoderAdapter';
import { UpdateProfileCommandHandler } from './UpdateProfileCommandHandler';
import { UpdateProfileCommand } from './UpdateProfileCommand';
import { IsEmailAlreadyExist } from 'src/Domain/User/Specification/IsEmailAlreadyExist';
import { PhotographerRepository } from 'src/Infrastructure/User/Repository/PhotographerRepository';
import { Photographer } from 'src/Domain/User/Photographer.entity';
import { EmailAlreadyExistException } from 'src/Domain/User/Exception/EmailAlreadyExistException';
import { PhotographerNotFoundException } from 'src/Domain/User/Exception/PhotographerNotFoundException';

describe('UpdateProfileCommandHandler', () => {
  const email = 'mathieu@fairness.coop';
  const photographer = mock(Photographer);
  const command = new UpdateProfileCommand(
    '2bd10a90-ad92-47f7-9004-c0a493ed1e13',
    'Mathieu',
    'Marchois',
    'mathieu@FAIRNESS.coop'
  );

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

  it('testPhotographerNotFound', async () => {
    when(photographerRepository.findOneById('2bd10a90-ad92-47f7-9004-c0a493ed1e13'))
      .thenResolve(null);

    try {
      expect(await commandHandler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(PhotographerNotFoundException);
      expect(e.message).toBe('users.errors.not_found');
      verify(isEmailAlreadyExist.isSatisfiedBy(anything())).never();
      verify(photographerRepository.findOneById('2bd10a90-ad92-47f7-9004-c0a493ed1e13')).once();
      verify(passwordEncoder.hash(anything())).never();
      verify(photographerRepository.save(anything())).never();
    }
  });

  it('testEmailAlreadyExist', async () => {
    when(photographerRepository.findOneById('2bd10a90-ad92-47f7-9004-c0a493ed1e13'))
      .thenResolve(instance(photographer));
    when(photographer.getEmail()).thenReturn('mathieu.marchois@fairess.coop');
    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(true);

    try {
      expect(await commandHandler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(EmailAlreadyExistException);
      expect(e.message).toBe('users.errors.email_already_exist');
      verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
      verify(photographerRepository.findOneById('2bd10a90-ad92-47f7-9004-c0a493ed1e13')).once();
      verify(passwordEncoder.hash(anything())).never();
      verify(photographerRepository.save(anything())).never();
    }
  });

  it('testUpdateWithoutPassword', async () => {
    when(photographerRepository.findOneById('2bd10a90-ad92-47f7-9004-c0a493ed1e13'))
      .thenResolve(instance(photographer));
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
    const photographer2 = mock(Photographer);
    when(photographerRepository.findOneById('a90-ad92-47f7-9004-c0a493ed1e13'))
      .thenResolve(instance(photographer2));
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

    verify(photographer2.update('Mathieu', 'Marchois', 'mathieu@fairness.coop')).once();
    verify(photographer2.updatePassword('azertyCrypted')).once();
    verify(photographerRepository.findOneById('a90-ad92-47f7-9004-c0a493ed1e13')).once();
    verify(photographer2.updatePassword('azertyCrypted')).calledBefore(
      photographerRepository.save(instance(photographer2))
    );
    verify(passwordEncoder.hash('azerty')).once();
    verify(
      photographer2.update('Mathieu', 'Marchois', 'mathieu@fairness.coop')
    ).calledBefore(photographerRepository.save(instance(photographer2)));
    verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
    verify(photographerRepository.save(instance(photographer2))).once();
  });
});
