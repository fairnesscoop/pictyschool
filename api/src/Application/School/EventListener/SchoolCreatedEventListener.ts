import { Inject } from '@nestjs/common';
import { EventsHandler, ICommandBus } from '@nestjs/cqrs';
import { IProductRepository } from 'src/Domain/Product/Repository/IProductRepository';
import { CreateSchoolProductCommand } from '../Command/Product/CreateSchoolProductCommand';
import { SchoolCreatedEvent } from '../Event/SchoolCreatedEvent';

@EventsHandler(SchoolCreatedEvent)
export class SchoolCreatedEventListener {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository
  ) {}

  public async handle({ schoolId }: SchoolCreatedEvent): Promise<void> {
    const products = await this.productRepository.findProductsToImport();

    for (const product of products) {
      const price = product.getPriceFromCents();

      await this.commandBus.execute(
        new CreateSchoolProductCommand(
          price,
          price,
          schoolId,
          product.getId()
        )
      );
    }
  }
}
