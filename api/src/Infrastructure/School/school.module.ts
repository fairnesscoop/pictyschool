import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from 'src/Domain/School/Photo.entity';
import { School } from 'src/Domain/School/School.entity';
import { AccessToken } from 'src/Domain/School/AccessToken.entity';
import { PhotoRepository } from './Repository/PhotoRepository';
import { AccessTokenRepository } from './Repository/AccessTokenRepository';
import { SchoolRepository } from './Repository/SchoolRepository';
import { IsSchoolAlreadyExist } from 'src/Domain/School/Specification/IsSchoolAlreadyExist';
import { CreateSchoolCommandHandler } from 'src/Application/School/Command/CreateSchoolCommandHandler';
import { CreateSchoolAction } from './Action/CreateSchoolAction';
import { BusModule } from '../bus.module';
import { GetSchoolsQueryHandler } from 'src/Application/School/Query/GetSchoolsQueryHandler';
import { GetSchoolsAction } from './Action/GetSchoolsAction';
import { UpdateSchoolAction } from './Action/UpdateSchoolAction';
import { UpdateSchoolCommandHandler } from 'src/Application/School/Command/UpdateSchoolCommandHandler';
import { GetSchoolAction } from './Action/GetSchoolAction';
import { GetSchoolByIdQueryHandler } from 'src/Application/School/Query/GetSchoolByIdQueryHandler';
import { SchoolProductRepository } from './Repository/SchoolProductRepository';
import { SchoolProduct } from 'src/Domain/School/SchoolProduct.entity';
import { CreateSchoolProductCommandHandler } from 'src/Application/School/Command/Product/CreateSchoolProductCommandHandler';
import { ProductRepository } from '../Product/Repository/ProductRepository';
import { Product } from 'src/Domain/Product/Product.entity';
import { IsSchoolProductAlreadyExist } from 'src/Domain/School/Specification/Product/IsSchoolProductAlreadyExist';
import { CreateSchoolProductAction } from './Action/Product/CreateSchoolProductAction';
import { UpdateSchoolProductCommandHandler } from 'src/Application/School/Command/Product/UpdateSchoolProductCommandHandler';
import { UpdateSchoolProductAction } from './Action/Product/UpdateSchoolProductAction';
import { GetSchoolProductAction } from './Action/Product/GetSchoolProductAction';
import { GetSchoolProductByIdQueryHandler } from 'src/Application/School/Query/Product/GetSchoolProductByIdQueryHandler';
import { GetSchoolProductsAction } from './Action/GetSchoolProductsAction';
import { GetSchoolProductsQueryHandler } from 'src/Application/School/Query/GetSchoolProductsQueryHandler';

@Module({
  imports: [
    BusModule,
    TypeOrmModule.forFeature([
      School,
      Photo,
      AccessToken,
      SchoolProduct,
      Product
    ])
  ],
  controllers: [
    GetSchoolsAction,
    CreateSchoolAction,
    GetSchoolAction,
    UpdateSchoolAction,
    CreateSchoolProductAction,
    GetSchoolProductAction,
    GetSchoolProductsAction,
    UpdateSchoolProductAction,
    UpdateSchoolAction
  ],
  providers: [
    { provide: 'IPhotoRepository', useClass: PhotoRepository },
    { provide: 'IAccessTokenRepository', useClass: AccessTokenRepository },
    { provide: 'ISchoolRepository', useClass: SchoolRepository },
    { provide: 'ISchoolProductRepository', useClass: SchoolProductRepository },
    { provide: 'IProductRepository', useClass: ProductRepository },
    IsSchoolAlreadyExist,
    CreateSchoolCommandHandler,
    GetSchoolProductsQueryHandler,
    GetSchoolsQueryHandler,
    GetSchoolByIdQueryHandler,
    UpdateSchoolCommandHandler,
    CreateSchoolProductCommandHandler,
    IsSchoolProductAlreadyExist,
    UpdateSchoolProductCommandHandler,
    GetSchoolProductByIdQueryHandler
  ]
})
export class SchoolModule {}
