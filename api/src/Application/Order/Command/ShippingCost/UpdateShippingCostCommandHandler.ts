import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateShippingCostCommand } from './UpdateShippingCostCommand';
import { IShippingCostRepository } from 'src/Domain/Order/Repository/IShippingCostRepository';
import { ShippingCostNotFoundException } from 'src/Domain/Order/Exception/ShippingCostNotFoundException';
import { IsShippingCostAlreadyExist } from 'src/Domain/Order/Specification/IsShippingCostAlreadyExist';
import { ShippingCostAlreadyExistException } from 'src/Domain/Order/Exception/ShippingCostAlreadyExistException';

@CommandHandler(UpdateShippingCostCommand)
export class UpdateShippingCostCommandHandler {
  constructor(
    @Inject('IShippingCostRepository')
    private readonly shippingcostRepository: IShippingCostRepository,
    private readonly isShippingCostAlreadyExist: IsShippingCostAlreadyExist
  ) {}

  public async execute(command: UpdateShippingCostCommand): Promise<string> {
    const { id, weight, price } = command;

    const shippingCost = await this.shippingcostRepository.findOneById(id);
    if (!shippingCost) {
      throw new ShippingCostNotFoundException();
    }

    if (
      weight !== shippingCost.getWeight() &&
      true === (await this.isShippingCostAlreadyExist.isSatisfiedBy(weight))
    ) {
      throw new ShippingCostAlreadyExistException();
    }

    shippingCost.update(weight, Math.round(price * 100));

    await this.shippingcostRepository.save(shippingCost);

    return shippingCost.getId();
  }
}
