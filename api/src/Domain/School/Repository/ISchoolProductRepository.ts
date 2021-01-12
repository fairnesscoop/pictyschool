import { Product } from 'src/Domain/Product/Product.entity';
import { School } from '../School.entity';
import { SchoolProduct } from '../SchoolProduct.entity';

export interface ISchoolProductRepository {
  save(schoolProduct: SchoolProduct): Promise<SchoolProduct>;
  findOneById(id: string): Promise<SchoolProduct | undefined>;
  findOneBySchoolAndProduct(school: School, product: Product): Promise<SchoolProduct | undefined>;
}
