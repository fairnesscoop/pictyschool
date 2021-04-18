import { DiscountRepository } from 'src/Infrastructure/School/Repository/DiscountRepository';
import { mock, instance, when, verify, anything } from 'ts-mockito';
import { Discount } from '../../Discount.entity';
import { School } from '../../School.entity';
import { IsDiscountAlreadyExist } from './IsDiscountAlreadyExist';

describe('IsDiscountAlreadyExist', () => {
  let discountRepository: DiscountRepository;
  let isDiscountAlreadyExist: IsDiscountAlreadyExist;

  const school = mock(School);
  beforeEach(() => {
    discountRepository = mock(DiscountRepository);
    isDiscountAlreadyExist = new IsDiscountAlreadyExist(
      instance(discountRepository)
    );
  });

  it('testDiscountAlreadyExist', async () => {
    when(discountRepository.findOneByAmountAndSchool(1000, instance(school))).thenResolve(
      new Discount(anything(), anything(), anything(), anything())
    );
    expect(await isDiscountAlreadyExist.isSatisfiedBy(1000, instance(school))).toBe(
      true
    );
    verify(discountRepository.findOneByAmountAndSchool(1000, instance(school))).once();
  });

  it('testDiscountDontExist', async () => {
    when(discountRepository.findOneByAmountAndSchool(1000, instance(school)))
      .thenResolve(null);
    expect(await isDiscountAlreadyExist.isSatisfiedBy(1000, instance(school))).toBe(
      false
    );
    verify(discountRepository.findOneByAmountAndSchool(1000, instance(school))).once();
  });
});
