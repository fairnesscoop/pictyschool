import { mock, instance, when, verify, anything } from 'ts-mockito';
import { PhotographerRepository } from 'src/Infrastructure/User/Repository/PhotographerRepository';
import { LoginQueryHandler } from 'src/Application/User/Query/LoginQueryHandler';
import { PasswordEncoderAdapter } from 'src/Infrastructure/Adapter/PasswordEncoderAdapter';
import { LoginQuery } from 'src/Application/User/Query/LoginQuery';
import { PasswordNotMatchException } from 'src/Domain/User/Exception/PasswordNotMatchException';
import { AuthenticatedView } from 'src/Application/User/View/AuthenticatedView';
import { PhotographerNotFoundException } from 'src/Domain/User/Exception/PhotographerNotFoundException';
import { Photographer } from 'src/Domain/User/Photographer.entity';

describe('LoginQueryHandler', () => {
  const email = 'mathieu@fairness.coop';
  const query = new LoginQuery('mathieu@FAIRNESS.coop', 'plainPassword');

  let photographerRepository: PhotographerRepository;
  let passwordEncoder: PasswordEncoderAdapter;
  let queryHandler: LoginQueryHandler;

  beforeEach(() => {
    photographerRepository = mock(PhotographerRepository);
    passwordEncoder = mock(PasswordEncoderAdapter);
    queryHandler = new LoginQueryHandler(
      instance(photographerRepository),
      instance(passwordEncoder)
    );
  });

  it('testUserNotFound', async () => {
    when(photographerRepository.findOneByEmail(email)).thenResolve(null);

    try {
      await queryHandler.execute(query);
    } catch (e) {
      expect(e.message).toBe('users.errors.not_found');
      expect(e).toBeInstanceOf(PhotographerNotFoundException);
      verify(photographerRepository.findOneByEmail(email)).once();
      verify(passwordEncoder.compare(anything(), anything())).never();
    }
  });

  it('testPasswordNotMatch', async () => {
    const photographer = mock(Photographer);
    when(passwordEncoder.compare('hash', 'plainPassword')).thenResolve(false);
    when(photographerRepository.findOneByEmail(email)).thenResolve(instance(photographer));
    when(photographer.getPassword()).thenReturn('hash');

    try {
      await queryHandler.execute(query);
    } catch (e) {
      expect(e.message).toBe('users.errors.password_not_match');
      expect(e).toBeInstanceOf(PasswordNotMatchException);
      verify(photographerRepository.findOneByEmail(email)).once();
      verify(passwordEncoder.compare('hash', 'plainPassword')).once();
      verify(photographer.getPassword()).once();
    }
  });

  it('testLoginSuccess', async () => {
    const photographer = mock(Photographer);
    when(photographerRepository.findOneByEmail(email)).thenResolve(instance(photographer));
    when(passwordEncoder.compare('hash', 'plainPassword')).thenResolve(true);
    when(photographer.getId()).thenReturn('14984335-f5aa-402a-a170-5393bb954538');
    when(photographer.getFirstName()).thenReturn('Mathieu');
    when(photographer.getLastName()).thenReturn('MARCHOIS');
    when(photographer.getEmail()).thenReturn(email);
    when(photographer.getPassword()).thenReturn('hash');
    when(photographer.getApiToken()).thenReturn('apiToken');

    expect(await queryHandler.execute(query)).toMatchObject(
      new AuthenticatedView(
        '14984335-f5aa-402a-a170-5393bb954538',
        'Mathieu',
        'MARCHOIS',
        email,
        'apiToken'
      )
    );

    verify(photographerRepository.findOneByEmail(email)).once();
    verify(passwordEncoder.compare('hash', 'plainPassword')).once();
    verify(photographer.getId()).once();
    verify(photographer.getFirstName()).once();
    verify(photographer.getLastName()).once();
    verify(photographer.getEmail()).once();
    verify(photographer.getPassword()).once();
    verify(photographer.getApiToken()).once();
  });
});
