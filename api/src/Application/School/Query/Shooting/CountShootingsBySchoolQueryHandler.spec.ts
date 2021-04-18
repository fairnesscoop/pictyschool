import { mock, instance, when, verify } from 'ts-mockito';
import { ShootingRepository } from 'src/Infrastructure/School/Repository/ShootingRepository';
import { CountShootingsBySchoolQueryHandler } from './CountShootingsBySchoolQueryHandler';
import { CountShootingsBySchoolQuery } from './CountShootingsBySchoolQuery';

describe('CountSchoolsQueryHandler', () => {
  it('testCountShootings', async () => {
    const shootingRepository = mock(ShootingRepository);
    when(
      shootingRepository.countBySchool('5eb3173b-97ab-4bbc-b31c-878d4bfafbc1')
    ).thenResolve(2);

    const queryHandler = new CountShootingsBySchoolQueryHandler(
      instance(shootingRepository)
    );

    expect(
      await queryHandler.execute(
        new CountShootingsBySchoolQuery('5eb3173b-97ab-4bbc-b31c-878d4bfafbc1')
      )
    ).toBe(2);
    verify(
      shootingRepository.countBySchool(
        '5eb3173b-97ab-4bbc-b31c-878d4bfafbc1'
      )
    ).once();
  });
});
