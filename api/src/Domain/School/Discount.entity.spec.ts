import { mock, instance } from 'ts-mockito';
import { Discount, DiscountType } from './Discount.entity';
import { School } from './School.entity';

describe('Discount', () => {
  it('testGetters', () => {
    const school = mock(School);
    const discount = new Discount(
      DiscountType.PERCENT,
      10000,
      100,
      instance(school)
    );
    expect(discount.getId()).toBeUndefined();
    expect(discount.getAmount()).toBe(10000);
    expect(discount.getType()).toBe(DiscountType.PERCENT);
    expect(discount.getValue()).toBe(100);
    expect(discount.getSchool()).toBe(instance(school));
  });
});
