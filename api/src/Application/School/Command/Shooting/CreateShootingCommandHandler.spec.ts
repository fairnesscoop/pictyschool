import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { ShootingRepository } from 'src/Infrastructure/School/Repository/ShootingRepository';
import { Shooting, ShootingStatus } from 'src/Domain/School/Shooting.entity';
import { CreateShootingCommandHandler } from './CreateShootingCommandHandler';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { CreateShootingCommand } from './CreateShootingCommand';
import { Product } from 'src/Domain/Product/Product.entity';
import { School } from 'src/Domain/School/School.entity';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';

describe('CreateShootingCommandHandler', () => {
  let schoolRepository: SchoolRepository;
  let shootingRepository: ShootingRepository;
  let createdShooting: Shooting;
  let handler: CreateShootingCommandHandler;

  const school = mock(School);
  const command = new CreateShootingCommand(
    'Prise de vue début année',
    new Date('2021-04-18'),
    new Date('2021-09-01'),
    '553e2b3c-eb11-42b1-8f76-903add071ca7',
    'Message notice'
  );

  beforeEach(() => {
    schoolRepository = mock(SchoolRepository);
    shootingRepository = mock(ShootingRepository);
    createdShooting = mock(Shooting);

    handler = new CreateShootingCommandHandler(
      instance(schoolRepository),
      instance(shootingRepository)
    );
  });

  it('testShootingCreatedSuccessfully', async () => {
    when(schoolRepository.findOneById('553e2b3c-eb11-42b1-8f76-903add071ca7'))
      .thenResolve(instance(school));
    when(createdShooting.getId()).thenReturn(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );
    when(
      shootingRepository.save(
        deepEqual(
          new Shooting(
            'Prise de vue début année',
            new Date('2021-04-18'),
            new Date('2021-09-01'),
            ShootingStatus.DISABLED,
            instance(school),
            'Message notice'
          )
        )
      )
    ).thenResolve(instance(createdShooting));

    expect(await handler.execute(command)).toBe(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );

    verify(
      shootingRepository.save(
        deepEqual(
          new Shooting(
            'Prise de vue début année',
            new Date('2021-04-18'),
            new Date('2021-09-01'),
            ShootingStatus.DISABLED,
            instance(school),
            'Message notice'
          )
        )
      )
    ).once();
    verify(createdShooting.getId()).once();
    verify(schoolRepository.findOneById('553e2b3c-eb11-42b1-8f76-903add071ca7')).once();
  });

  it('testSchoolNotFound', async () => {
    when(schoolRepository.findOneById('553e2b3c-eb11-42b1-8f76-903add071ca7'))
      .thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolNotFoundException);
      expect(e.message).toBe('schools.errors.not_found');
      verify(schoolRepository.findOneById('553e2b3c-eb11-42b1-8f76-903add071ca7')).once();
      verify(shootingRepository.save(anything())).never();
      verify(createdShooting.getId()).never();
    }
  });
});
