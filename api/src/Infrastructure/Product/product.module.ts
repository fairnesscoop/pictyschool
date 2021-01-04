import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusModule } from '../bus.module';
import { Product } from 'src/Domain/Product/Product.entity';
import { ProductRepository } from './Repository/ProductRepository';

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([Product])],
  controllers: [],
  providers: [
    { provide: 'IProductRepository', useClass: ProductRepository }
  ]
})
export class ProductModule {}
