import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ShippingCostNotFoundException } from 'src/Domain/Order/Exception/ShippingCostNotFoundException';
import { IShippingCostRepository } from 'src/Domain/Order/Repository/IShippingCostRepository';
import { RemoveShippingCostCommand } from './RemoveShippingCostCommand';

@CommandHandler(RemoveShippingCostCommand)
export class RemoveShippingCostCommandHandler {
  constructor(
    @Inject('IShippingCostRepository')
    private readonly shippingCostRepository: IShippingCostRepository,
  ) {}

  public async execute({ id }: RemoveShippingCostCommand): Promise<void> {
    const shippingcost = await this.shippingCostRepository.findOneById(id);

    if (!shippingcost) {
      throw new ShippingCostNotFoundException();
    }

    await this.shippingCostRepository.remove(shippingcost);
  }
}
