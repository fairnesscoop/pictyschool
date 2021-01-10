import { Inject } from '@nestjs/common';
import { Product } from 'src/Domain/Product/Product.entity';
import { ISchoolProductRepository } from '../../Repository/ISchoolProductRepository';
import { School } from '../../School.entity';
import { SchoolProduct } from '../../SchoolProduct.entity';

export class IsSchoolProductAlreadyExist {
  constructor(
    @Inject('ISchoolProductRepository')
    private readonly schoolProductRepository: ISchoolProductRepository
  ) {}

  public async isSatisfiedBy(school: School, product: Product): Promise<boolean> {
    return (await this.schoolProductRepository.findOneBySchoolAndProduct(school, product))
      instanceof SchoolProduct;
  }
}
