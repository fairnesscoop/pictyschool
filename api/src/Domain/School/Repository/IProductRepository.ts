import { Product } from 'src/Domain/Product/Product.entity';

export interface IProductRepository {
  save(product: Product): Promise<Product>;
  findOneByTitle(title: string): Promise<Product | undefined>;
  findOneById(id: string): Promise<Product | undefined>;
  findProducts(page: number): Promise<[Product[], number]>;
}
