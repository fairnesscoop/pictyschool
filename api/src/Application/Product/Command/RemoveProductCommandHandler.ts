import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ProductNotFoundException } from 'src/Domain/Product/Exception/ProductNotFoundException';
import { IProductRepository } from 'src/Domain/Product/Repository/IProductRepository';
import { RemoveProductCommand } from './RemoveProductCommand';

@CommandHandler(RemoveProductCommand)
export class RemoveProductCommandHandler {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  public async execute({ id }: RemoveProductCommand): Promise<void> {
    const product = await this.productRepository.findOneById(id);

    if (!product) {
      throw new ProductNotFoundException();
    }

    await this.productRepository.remove(product);
  }
}
