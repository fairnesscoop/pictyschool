import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ProductAlreadyExistException } from 'src/Domain/Product/Exception/ProductAlreadyExistException';
import { IProductRepository } from 'src/Domain/Product/Repository/IProductRepository';
import { Product } from 'src/Domain/Product/Product.entity';
import { IsProductAlreadyExist } from 'src/Domain/Product/Specification/IsProductAlreadyExist';
import { CreateProductCommand } from './CreateProductCommand';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    private readonly isProductAlreadyExist: IsProductAlreadyExist
  ) {}

  public async execute(command: CreateProductCommand): Promise<string> {
    const { title, description, unitPrice, weight } = command;

    if (true === (await this.isProductAlreadyExist.isSatisfiedBy(title))) {
      throw new ProductAlreadyExistException();
    }

    const product = await this.productRepository.save(
      new Product(title, description, Math.round(unitPrice * 100), weight)
    );

    return product.getId();
  }
}
