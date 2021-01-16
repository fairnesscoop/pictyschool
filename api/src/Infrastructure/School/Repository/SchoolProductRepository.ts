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

  public remove(schoolProduct: SchoolProduct): void {
    this.repository.delete(schoolProduct);
  }

  public findOneById(id: string): Promise<SchoolProduct | undefined> {
    return this.repository
      .createQueryBuilder('schoolProduct')
      .select([
        'schoolProduct.id',
        'schoolProduct.unitPrice',
        'product.title',
        'product.unitPrice'
      ])
      .where('schoolProduct.id = :id', { id })
      .innerJoin('schoolProduct.product', 'product')
      .getOne();
  }

  public countBySchoolId(id: string): Promise<number> {
    return this.repository
      .createQueryBuilder('schoolProduct')
      .select('schoolProduct.id')
      .innerJoin('schoolProduct.school', 'school', 'school.id = :id', { id })
      .getCount();
  }

  public findOneBySchoolAndProduct(
    school: School,
    product: Product
  ): Promise<SchoolProduct | undefined> {
    return this.repository
      .createQueryBuilder('schoolProduct')
      .select(['schoolProduct.id'])
      .innerJoin('schoolProduct.school', 'school', 'school.id = :school', {
        school: school.getId()
      })
      .innerJoin('schoolProduct.product', 'product', 'product.id = :product', {
        product: product.getId()
      })
      .getOne();
  }

  public findBySchoolId(id: string): Promise<SchoolProduct[]> {
    return this.repository
      .createQueryBuilder('schoolProduct')
      .select(['schoolProduct.id', 'schoolProduct.unitPrice', 'product.title', 'product.unitPrice'])
      .innerJoin('schoolProduct.school', 'school',  'school.id = :id', { id })
      .innerJoin('schoolProduct.product', 'product')
      .orderBy('product.title')
      .getMany();
  }
}
