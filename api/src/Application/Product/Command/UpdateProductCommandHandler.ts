import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateProductCommand } from './UpdateProductCommand';
import { IProductRepository } from 'src/Domain/Product/Repository/IProductRepository';
import { ProductNotFoundException } from 'src/Domain/Product/Exception/ProductNotFoundException';
import { IsProductAlreadyExist } from 'src/Domain/Product/Specification/IsProductAlreadyExist';
import { ProductAlreadyExistException } from 'src/Domain/Product/Exception/ProductAlreadyExistException';

@CommandHandler(UpdateProductCommand)
export class UpdateProductCommandHandler {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    private readonly isProductAlreadyExist: IsProductAlreadyExist
  ) {}

  public async execute(command: UpdateProductCommand): Promise<string> {
    const { id, title, description, unitPrice } = command;

    const product = await this.productRepository.findOneById(id);
    if (!product) {
      throw new ProductNotFoundException();
    }

    if (title !== product.getTitle()
      && true === (await this.isProductAlreadyExist.isSatisfiedBy(title))) {
      throw new ProductAlreadyExistException();
    }

    product.update(title, description, Math.round(unitPrice * 100));

    await this.productRepository.save(product);

    return product.getId();
  }
}
