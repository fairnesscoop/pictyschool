import { mock, instance, when, verify } from 'ts-mockito';
import { Shooting, ShootingStatus } from 'src/Domain/School/Shooting.entity';
import { GetShootingsBySchoolQuery } from './GetShootingsBySchoolQuery';
import { GetShootingsBySchoolQueryHandler } from './GetShootingsBySchoolQueryHandler';
import { ShootingRepository } from 'src/Infrastructure/School/Repository/ShootingRepository';
import { School } from 'src/Domain/School/School.entity';
import { ShootingSummaryView } from '../../View/ShootingSummaryView';

describe('GetShootingBySchoolQueryHandler', () => {
  it('testGetShootings', async () => {
    const shootingRepository = mock(ShootingRepository);

    const school = mock(School);
    const shooting = mock(Shooting);
    when(shooting.getId()).thenReturn(
      '4de2ffc4-e835-44c8-95b7-17c171c09873'
    );
    when(shooting.getName()).thenReturn('Prise de vue fin année');
    when(shooting.getShootingDate()).thenReturn(new Date('2021-09-01'));
    when(shooting.getSchool()).thenReturn(instance(school));
    when(shooting.getStatus()).thenReturn(ShootingStatus.DISABLED);

    when(
      shootingRepository.findBySchool(
        '5eb3173b-97ab-4bbc-b31c-878d4bfafbc1'
      )
    ).thenResolve([instance(shooting)]);

    const queryHandler = new GetShootingsBySchoolQueryHandler(
      instance(shootingRepository)
    );

    const expectedResult = [
      new ShootingSummaryView(
        '4de2ffc4-e835-44c8-95b7-17c171c09873',
        'Prise de vue fin année',
        ShootingStatus.DISABLED,
        new Date('2021-09-01')
      )
    ];

    expect(
      await queryHandler.execute(
        new GetShootingsBySchoolQuery('5eb3173b-97ab-4bbc-b31c-878d4bfafbc1')
      )
    ).toMatchObject(expectedResult);
    verify(
      shootingRepository.findBySchool(
        '5eb3173b-97ab-4bbc-b31c-878d4bfafbc1'
      )
    ).once();
  });
});
