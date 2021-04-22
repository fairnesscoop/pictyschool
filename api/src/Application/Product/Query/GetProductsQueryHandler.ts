import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProductsQuery } from './GetProductsQuery';
import { Pagination } from 'src/Application/Common/Pagination';
import { IProductRepository } from 'src/Domain/Product/Repository/IProductRepository';
import { ProductView } from '../View/ProductView';

@QueryHandler(GetProductsQuery)
export class GetProductsQueryHandler {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository
  ) {}

  public async execute(
    query: GetProductsQuery
  ): Promise<Pagination<ProductView>> {
    const { page } = query;

    const productViews: ProductView[] = [];
    const [ products, total ] = await this.productRepository.findProducts(
      page
    );

    for (const product of products) {
      productViews.push(
        new ProductView(
          product.getId(),
          product.getTitle(),
          product.getPriceFromCents(),
          product.getDescription(),
        )
      );
    }

    return new Pagination<ProductView>(productViews, total);
  }
}
