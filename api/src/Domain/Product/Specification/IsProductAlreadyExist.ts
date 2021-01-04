import { Inject } from '@nestjs/common';
import { IProductRepository } from '../Repository/IProductRepository';
import { Product } from '../Product.entity';

export class IsProductAlreadyExist {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository
  ) {}

  public async isSatisfiedBy(title: string): Promise<boolean> {
    return (
      (await this.productRepository.findOneByTitle(title)) instanceof Product
    );
  }
}
