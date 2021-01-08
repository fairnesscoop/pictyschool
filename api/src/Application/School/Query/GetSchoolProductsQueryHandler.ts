import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSchoolProductsQuery } from './GetSchoolProductsQuery';
import { SchoolProductView } from '../View/SchoolProductView';
import { ISchoolProductRepository } from 'src/Domain/School/Repository/ISchoolProductRepository';

@QueryHandler(GetSchoolProductsQuery)
export class GetSchoolProductsQueryHandler {
  constructor(
    @Inject('ISchoolProductRepository')
    private readonly schoolProductRepository: ISchoolProductRepository
  ) {}

  public async execute(
    query: GetSchoolProductsQuery
  ): Promise<SchoolProductView[]> {

    const schoolProductViews: SchoolProductView[] = [];
    const schoolProducts = await this.schoolProductRepository.findBySchoolId(
      query.schoolId
    );

    for (const schoolProduct of schoolProducts) {
      schoolProductViews.push(
        new SchoolProductView(
          schoolProduct.getId(),
          schoolProduct.getProduct().getTitle(),
          schoolProduct.getUnitPrice() / 100
        )
      );
    }

    return schoolProductViews;
  }
}
