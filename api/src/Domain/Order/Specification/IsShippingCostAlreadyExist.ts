import { Inject } from '@nestjs/common';
import { IShippingCostRepository } from '../Repository/IShippingCostRepository';
import { ShippingCost } from '../ShippingCost.entity';

export class IsShippingCostAlreadyExist {
  constructor(
    @Inject('IShippingCostRepository')
    private readonly shippingcostRepository: IShippingCostRepository
  ) {}

  public async isSatisfiedBy(grams: number): Promise<boolean> {
    return (
      (await this.shippingcostRepository.findOneByGrams(grams)) instanceof ShippingCost
    );
  }
}
