import { mock, instance, when, verify } from 'ts-mockito';
import { Shooting, ShootingStatus } from 'src/Domain/School/Shooting.entity';
import { ShootingRepository } from 'src/Infrastructure/School/Repository/ShootingRepository';
import { ShootingView } from '../../View/ShootingView';
import { GetShootingByIdQuery } from './GetSchootingByIdQuery';
import { GetShootingByIdQueryHandler } from './GetShootingByIdQueryHandler';
import { ShootingNotFoundException } from 'src/Domain/School/Exception/ShootingNotFoundException';

describe('GetShootingByIdQueryHandler', () => {
  const query = new GetShootingByIdQuery('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');

  it('testGetShooting', async () => {
    const shootingRepository = mock(ShootingRepository);
    const queryHandler = new GetShootingByIdQueryHandler(instance(shootingRepository));
    const expectedResult = new ShootingView(
      'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
      'Prise de vue fin année',
      ShootingStatus.DISABLED,
      new Date('2021-04-18'),
      new Date('2021-09-01'),
      new Date('2021-12-01'),
      'Notice'
    );

    const shooting = mock(Shooting);
    when(shooting.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(shooting.getName()).thenReturn('Prise de vue fin année');
    when(shooting.getGroupClosingDate()).thenReturn(new Date('2021-09-01'));
    when(shooting.getIndividualClosingDate()).thenReturn(new Date('2021-12-01'));
    when(shooting.getShootingDate()).thenReturn(new Date('2021-04-18'));
    when(shooting.getNotice()).thenReturn('Notice');
    when(shooting.getStatus()).thenReturn(ShootingStatus.DISABLED);
    when(
      shootingRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(shooting));

    expect(await queryHandler.execute(query)).toMatchObject(expectedResult);

    verify(
      shootingRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
  });

  it('testGetShootingNotFound', async () => {
    const shootingRepository = mock(ShootingRepository);
    const queryHandler = new GetShootingByIdQueryHandler(instance(shootingRepository));
    when(
      shootingRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(null);

    try {
      expect(await queryHandler.execute(query)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(ShootingNotFoundException);
      expect(e.message).toBe('schools.shootings.errors.not_found');
      verify(
        shootingRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
    }
  });
});
