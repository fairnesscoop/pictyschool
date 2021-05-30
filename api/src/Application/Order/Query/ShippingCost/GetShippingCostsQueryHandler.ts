import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetShippingCostsQuery } from './GetShippingCostsQuery';
import { IShippingCostRepository } from 'src/Domain/Order/Repository/IShippingCostRepository';
import { ShippingCostView } from '../../View/ShippingCostView';

@QueryHandler(GetShippingCostsQuery)
export class GetShippingCostsQueryHandler {
  constructor(
    @Inject('IShippingCostRepository')
    private readonly shippingcostRepository: IShippingCostRepository
  ) { }

  public async execute(query: GetShippingCostsQuery): Promise<ShippingCostView[]> {
    const shippingcostViews: ShippingCostView[] = [];
    const shippingCosts = await this.shippingcostRepository.findShippingCosts();

    for (const shippingCost of shippingCosts) {
      shippingcostViews.push(
        new ShippingCostView(
          shippingCost.getId(),
          shippingCost.getGrams(),
          shippingCost.getPriceFromCents(),
        )
      );
    }

    return shippingcostViews;
  }
}
