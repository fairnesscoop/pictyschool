import { Product } from '../Product.entity';

export interface IProductRepository {
  save(task: Product): Promise<Product>;
  findOneByTitle(title: string): Promise<Product | undefined>;
}
