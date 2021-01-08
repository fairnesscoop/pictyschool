import { SchoolProduct } from '../SchoolProduct.entity';

export interface ISchoolProductRepository {
  save(schoolProduct: SchoolProduct): Promise<SchoolProduct>;
}
