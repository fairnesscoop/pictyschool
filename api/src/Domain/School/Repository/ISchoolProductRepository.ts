import { Product } from 'src/Domain/Product/Product.entity';
import { School } from '../School.entity';
import { SchoolProduct } from '../SchoolProduct.entity';

export interface ISchoolProductRepository {
  save(schoolProduct: SchoolProduct): Promise<SchoolProduct>;
  remove(schoolProduct: SchoolProduct): void;
  findOneById(id: string): Promise<SchoolProduct | undefined>;
  countBySchoolId(schoolId: string): Promise<number>;
  findOneBySchoolAndProduct(school: School, product: Product): Promise<SchoolProduct | undefined>;
  findBySchoolId(schoolId: string): Promise<SchoolProduct[]>;
}
