import { Inject } from '@nestjs/common';
import { Discount } from '../../Discount.entity';
import { IDiscountRepository } from '../../Repository/IDiscountRepository';
import { School } from '../../School.entity';

export class IsDiscountAlreadyExist {
  constructor(
    @Inject('IDiscountRepository')
    private readonly discountRepository: IDiscountRepository
  ) {}

  public async isSatisfiedBy(amount: number, school: School): Promise<boolean> {
    return (
      (await this.discountRepository.findOneByAmountAndSchool(amount, school)) instanceof Discount
    );
  }
}
