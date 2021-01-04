import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/Domain/Product/Product.entity';
import { IProductRepository } from 'src/Domain/Product/Repository/IProductRepository';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>
  ) {}

  public save(product: Product): Promise<Product> {
    return this.repository.save(product);
  }
}
