import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { DiscountNotFoundException } from 'src/Domain/School/Exception/DiscountNotFoundException';
import { IDiscountRepository } from 'src/Domain/School/Repository/IDiscountRepository';
import { RemoveDiscountCommand } from './RemoveDiscountCommand';

@CommandHandler(RemoveDiscountCommand)
export class RemoveDiscountCommandHandler {
  constructor(
    @Inject('IDiscountRepository')
    private readonly discountRepository: IDiscountRepository,
  ) {}

  public async execute({ id }: RemoveDiscountCommand): Promise<void> {
    const discount = await this.discountRepository.findOneById(id);

    if (!discount) {
      throw new DiscountNotFoundException();
    }

    await this.discountRepository.remove(discount);
  }
}
