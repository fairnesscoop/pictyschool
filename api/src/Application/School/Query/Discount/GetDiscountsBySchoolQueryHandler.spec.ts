import { mock, instance, when, verify } from 'ts-mockito';
import { Discount, DiscountType } from 'src/Domain/School/Discount.entity';
import { GetDiscountsBySchoolQuery } from './GetDiscountsBySchoolQuery';
import { DiscountRepository } from 'src/Infrastructure/School/Repository/DiscountRepository';
import { School } from 'src/Domain/School/School.entity';
import { DiscountView } from '../../View/DiscountView';
import { GetDiscountsBySchoolQueryHandler } from './GetDiscountsBySchoolQueryHandler';

describe('GetDiscountBySchoolQueryHandler', () => {
  it('testGetDiscounts', async () => {
    const discountRepository = mock(DiscountRepository);

    const school = mock(School);
    const discount = mock(Discount);
    when(discount.getId()).thenReturn(
      '4de2ffc4-e835-44c8-95b7-17c171c09873'
    );
    when(discount.getAmount()).thenReturn(10000);
    when(discount.getValue()).thenReturn(1000);
    when(discount.getType()).thenReturn(DiscountType.PERCENT);

    when(
      discountRepository.findBySchool(
        '5eb3173b-97ab-4bbc-b31c-878d4bfafbc1'
      )
    ).thenResolve([instance(discount)]);

    const queryHandler = new GetDiscountsBySchoolQueryHandler(
      instance(discountRepository)
    );

    const expectedResult = [
      new DiscountView(
        '4de2ffc4-e835-44c8-95b7-17c171c09873',
        DiscountType.PERCENT,
        100,
        10
      )
    ];

    expect(
      await queryHandler.execute(
        new GetDiscountsBySchoolQuery('5eb3173b-97ab-4bbc-b31c-878d4bfafbc1')
      )
    ).toMatchObject(expectedResult);
    verify(
      discountRepository.findBySchool(
        '5eb3173b-97ab-4bbc-b31c-878d4bfafbc1'
      )
    ).once();
  });
});
