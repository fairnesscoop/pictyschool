import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProductByIdQuery } from './GetProductByIdQuery';
import { IProductRepository } from 'src/Domain/Product/Repository/IProductRepository';
import { ProductView } from '../View/ProductView';
import { ProductNotFoundException } from 'src/Domain/Product/Exception/ProductNotFoundException';

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdQueryHandler {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository
  ) {}

  public async execute(query: GetProductByIdQuery): Promise<ProductView> {
    const product = await this.productRepository.findOneById(query.id);

    if (!product) {
      throw new ProductNotFoundException();
    }

    return new ProductView(
      product.getId(),
      product.getTitle(),
      product.getPriceFromCents(),
      product.getWeight(),
      product.getDescription()
    );
  }
}
