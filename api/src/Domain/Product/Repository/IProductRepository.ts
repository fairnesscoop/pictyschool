import { Product } from '../Product.entity';

export interface IProductRepository {
  save(task: Product): Promise<Product>;
}
