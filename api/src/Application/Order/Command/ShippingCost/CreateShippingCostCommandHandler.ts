import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ShippingCostAlreadyExistException } from 'src/Domain/Order/Exception/ShippingCostAlreadyExistException';
import { IShippingCostRepository } from 'src/Domain/Order/Repository/IShippingCostRepository';
import { ShippingCost } from 'src/Domain/Order/ShippingCost.entity';
import { IsShippingCostAlreadyExist } from 'src/Domain/Order/Specification/IsShippingCostAlreadyExist';
import { CreateShippingCostCommand } from './CreateShippingCostCommand';

@CommandHandler(CreateShippingCostCommand)
export class CreateShippingCostCommandHandler {
  constructor(
    @Inject('IShippingCostRepository')
    private readonly shippingcostRepository: IShippingCostRepository,
    private readonly isShippingCostAlreadyExist: IsShippingCostAlreadyExist
  ) {}

  public async execute(command: CreateShippingCostCommand): Promise<string> {
    const { weight, price } = command;

    if (true === (await this.isShippingCostAlreadyExist.isSatisfiedBy(weight))) {
      throw new ShippingCostAlreadyExistException();
    }

    const shippingCost = await this.shippingcostRepository.save(
      new ShippingCost(weight, Math.round(price * 100))
    );

    return shippingCost.getId();
  }
}
