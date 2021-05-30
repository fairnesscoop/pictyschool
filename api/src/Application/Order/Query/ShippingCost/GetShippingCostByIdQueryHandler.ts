import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IShippingCostRepository } from 'src/Domain/Order/Repository/IShippingCostRepository';
import { ShippingCostView } from '../../View/ShippingCostView';
import { ShippingCostNotFoundException } from 'src/Domain/Order/Exception/ShippingCostNotFoundException';
import { GetShippingCostByIdQuery } from './GetShippingCostByIdQuery';

@QueryHandler(GetShippingCostByIdQuery)
export class GetShippingCostByIdQueryHandler {
  constructor(
    @Inject('IShippingCostRepository')
    private readonly shippingcostRepository: IShippingCostRepository
  ) {}

  public async execute(query: GetShippingCostByIdQuery): Promise<ShippingCostView> {
    const shippingCost = await this.shippingcostRepository.findOneById(query.id);

    if (!shippingCost) {
      throw new ShippingCostNotFoundException();
    }

    return new ShippingCostView(
      shippingCost.getId(),
      shippingCost.getGrams(),
      shippingCost.getPriceFromCents(),
    );
  }
}
