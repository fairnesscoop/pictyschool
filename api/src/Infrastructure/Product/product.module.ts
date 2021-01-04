import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusModule } from '../bus.module';
import { Product } from 'src/Domain/Product/Product.entity';
import { ProductRepository } from './Repository/ProductRepository';
import { CreateProductCommandHandler } from 'src/Application/Product/Command/CreateProductCommandHandler';
import { IsProductAlreadyExist } from 'src/Domain/Product/Specification/IsProductAlreadyExist';
import { CreateProductAction } from './Action/CreateProductAction';
import { GetProductsQueryHandler } from 'src/Application/Product/Query/GetProductsQueryHandler';
import { GetProductsAction } from './Action/GetProductsAction';

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([Product])],
  controllers: [GetProductsAction, CreateProductAction],
  providers: [
    { provide: 'IProductRepository', useClass: ProductRepository },
    CreateProductCommandHandler,
    IsProductAlreadyExist,
    GetProductsQueryHandler
  ]
})
export class ProductModule {}
