import { Product } from '../Product.entity';

export interface IProductRepository {
  save(task: Product): Promise<Product>;
  findOneByTitle(title: string): Promise<Product | undefined>;
  findOneById(id: string): Promise<Product | undefined>;
  findProducts(page: number): Promise<[Product[], number]>;
}
