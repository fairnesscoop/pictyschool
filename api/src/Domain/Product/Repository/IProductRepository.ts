import { Product } from '../Product.entity';

export interface IProductRepository {
  save(product: Product): Promise<Product>;
  remove(product: Product): void;
  findOneByTitle(title: string): Promise<Product | undefined>;
  findOneById(id: string): Promise<Product | undefined>;
  findProducts(page: number): Promise<[Product[], number]>;
  findProductsToImport(): Promise<Product[]>;
}
