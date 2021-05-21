import { mock, instance, when, verify, anything, deepEqual } from 'ts-mockito';
import { ShootingRepository } from 'src/Infrastructure/School/Repository/ShootingRepository';
import { Shooting } from 'src/Domain/School/Shooting.entity';
import { UpdateShootingCommandHandler } from './UpdateShootingCommandHandler';
import { UpdateShootingCommand } from './UpdateShootingCommand';
import { ShootingNotFoundException } from 'src/Domain/School/Exception/ShootingNotFoundException';

describe('UpdateShootingCommandHandler', () => {
  let shootingRepository: ShootingRepository;
  let updatedShooting: Shooting;
  let handler: UpdateShootingCommandHandler;

  const command = new UpdateShootingCommand(
    '17efcbee-bd2f-410e-9e99-51684b592bad',
    'Prise de vue début année',
    new Date('2021-04-18'),
    new Date('2021-09-01'),
  );

  beforeEach(() => {
    shootingRepository = mock(ShootingRepository);
    updatedShooting = mock(Shooting);

    handler = new UpdateShootingCommandHandler(
      instance(shootingRepository)
    );
  });

  it('testShootingUpdatedSuccessfully', async () => {
    when(shootingRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(instance(updatedShooting));
    when(updatedShooting.getId()).thenReturn(
      '17efcbee-bd2f-410e-9e99-51684b592bad'
    );
    when(
      shootingRepository.save(instance(updatedShooting))
    ).thenResolve(instance(updatedShooting));

    expect(await handler.execute(command)).toBe(
      '17efcbee-bd2f-410e-9e99-51684b592bad'
    );

    verify(
      shootingRepository.save(instance(updatedShooting))
    ).once();
    verify(updatedShooting.getId()).once();
    verify(updatedShooting.update(
      'Prise de vue début année',
      deepEqual(new Date('2021-04-18')),
      deepEqual(new Date('2021-09-01')))
    ).once();
    verify(shootingRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
  });

  it('testShootingNotFound', async () => {
    when(shootingRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(ShootingNotFoundException);
      expect(e.message).toBe('schools.shootings.errors.not_found');
      verify(shootingRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
      verify(shootingRepository.save(anything())).never();
    }
  });
});
