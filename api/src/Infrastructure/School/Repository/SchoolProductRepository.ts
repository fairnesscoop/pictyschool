import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolProduct } from 'src/Domain/School/SchoolProduct.entity';
import { ISchoolProductRepository } from 'src/Domain/School/Repository/ISchoolProductRepository';
import { School } from 'src/Domain/School/School.entity';
import { Product } from 'src/Domain/Product/Product.entity';

@Injectable()
export class SchoolProductRepository implements ISchoolProductRepository {
  constructor(
    @InjectRepository(SchoolProduct)
    private readonly repository: Repository<SchoolProduct>
  ) {}

  public save(schoolProduct: SchoolProduct): Promise<SchoolProduct> {
    return this.repository.save(schoolProduct);
  }

  public findOneById(id: string): Promise<SchoolProduct | undefined> {
    return this.repository
      .createQueryBuilder('schoolProduct')
      .select([
        'schoolProduct.id',
        'schoolProduct.unitPrice',
      ])
      .where('schoolProduct.id = :id', { id })
      .getOne();
  }

  public findOneBySchoolAndProduct(school: School, product: Product)
  : Promise<SchoolProduct | undefined> {
    return this.repository
      .createQueryBuilder('schoolProduct')
      .select([
        'schoolProduct.id'
      ])
      .innerJoin('schoolProduct.school', 'school', 'school.id = :school', { school: school.getId() })
      .innerJoin('schoolProduct.product', 'product', 'product.id = :product', { product: product.getId() })
      .getOne();
  }
}
