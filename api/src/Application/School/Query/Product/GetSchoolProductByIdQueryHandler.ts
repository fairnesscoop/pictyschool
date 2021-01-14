import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSchoolProductByIdQuery } from './GetSchoolProductByIdQuery';
import { ISchoolProductRepository } from 'src/Domain/School/Repository/ISchoolProductRepository';
import { SchoolProductNotFoundException } from 'src/Domain/School/Exception/SchoolProductNotFoundException';
import { SchoolProductView } from '../../View/SchoolProductView';
import { ProductSummaryView } from 'src/Application/Product/View/ProductSummaryView';

@QueryHandler(GetSchoolProductByIdQuery)
export class GetSchoolProductByIdQueryHandler {
  constructor(
    @Inject('ISchoolProductRepository')
    private readonly schoolproductRepository: ISchoolProductRepository
  ) {}

  public async execute(query: GetSchoolProductByIdQuery): Promise<SchoolProductView> {
    const schoolProduct = await this.schoolproductRepository.findOneById(query.id);

    if (!schoolProduct) {
      throw new SchoolProductNotFoundException();
    }

    const product = schoolProduct.getProduct();

    return new SchoolProductView(
      schoolProduct.getId(),
      schoolProduct.getUnitPrice() / 100,
      new ProductSummaryView(
        product.getTitle(),
        product.getUnitPrice() / 100
      )
    );
  }
}
