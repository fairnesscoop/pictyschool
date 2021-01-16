import { mock, instance, when, verify } from 'ts-mockito';
import { CountSchoolProductsQuery } from './CountSchoolProductsQuery';
import { CountSchoolProductsQueryHandler } from './CountSchoolProductsQueryHandler';
import { SchoolProductRepository } from 'src/Infrastructure/School/Repository/SchoolProductRepository';

describe('CountSchoolsQueryHandler', () => {
  it('testCountSchoolProducts', async () => {
    const schoolProductRepository = mock(SchoolProductRepository);
    when(
      schoolProductRepository.countBySchoolId('5eb3173b-97ab-4bbc-b31c-878d4bfafbc1')
    ).thenResolve(2);

    const queryHandler = new CountSchoolProductsQueryHandler(
      instance(schoolProductRepository)
    );

    expect(
      await queryHandler.execute(
        new CountSchoolProductsQuery('5eb3173b-97ab-4bbc-b31c-878d4bfafbc1')
      )
    ).toBe(2);
    verify(
      schoolProductRepository.countBySchoolId(
        '5eb3173b-97ab-4bbc-b31c-878d4bfafbc1'
      )
    ).once();
  });
});
