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
    const { id, grams, price } = command;

    const shippingCost = await this.shippingcostRepository.findOneById(id);
    if (!shippingCost) {
      throw new ShippingCostNotFoundException();
    }

    if (
      grams !== shippingCost.getGrams() &&
      true === (await this.isShippingCostAlreadyExist.isSatisfiedBy(grams))
    ) {
      throw new ShippingCostAlreadyExistException();
    }

    shippingCost.update(grams, Math.round(price * 100));

    await this.shippingcostRepository.save(shippingCost);

    return shippingCost.getId();
  }
}
