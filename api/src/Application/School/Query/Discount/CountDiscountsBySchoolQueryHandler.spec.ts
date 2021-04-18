import { mock, instance, when, verify } from 'ts-mockito';
import { DiscountRepository } from 'src/Infrastructure/School/Repository/DiscountRepository';
import { CountDiscountsBySchoolQueryHandler } from './CountDiscountsBySchoolQueryHandler';
import { CountDiscountsBySchoolQuery } from './CountDiscountsBySchoolQuery';

describe('CountSchoolsQueryHandler', () => {
  it('testCountDiscounts', async () => {
    const discountRepository = mock(DiscountRepository);
    when(
      discountRepository.countBySchool('5eb3173b-97ab-4bbc-b31c-878d4bfafbc1')
    ).thenResolve(2);

    const queryHandler = new CountDiscountsBySchoolQueryHandler(
      instance(discountRepository)
    );

    expect(
      await queryHandler.execute(
        new CountDiscountsBySchoolQuery('5eb3173b-97ab-4bbc-b31c-878d4bfafbc1')
      )
    ).toBe(2);
    verify(
      discountRepository.countBySchool(
        '5eb3173b-97ab-4bbc-b31c-878d4bfafbc1'
      )
    ).once();
  });
});
