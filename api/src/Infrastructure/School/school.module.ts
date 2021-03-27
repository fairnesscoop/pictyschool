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
import { GetSchoolProductsAction } from './Action/Product/GetSchoolProductsAction';
import { RemoveSchoolProductCommandHandler } from 'src/Application/School/Command/Product/RemoveSchoolProductCommandHandler';
import { RemoveSchoolProductAction } from './Action/Product/RemoveSchoolProductAction';
import { GetSchoolProductsQueryHandler } from 'src/Application/School/Query/Product/GetSchoolProductsQueryHandler';
import { CountSchoolProductsQueryHandler } from 'src/Application/School/Query/Product/CountSchoolProductsQueryHandler';
import { CountSchoolProductsAction } from './Action/Product/CountSchoolProductsAction';
import { SchoolTypeRepository } from './Repository/SchoolTypeRepository';
import { SchoolType } from 'src/Domain/School/SchoolType.entity';
import { UpdateSchoolTypeCommandHandler } from 'src/Application/School/Command/Type/UpdateSchoolTypeCommandHandler';
import { CreateSchoolTypeCommandHandler } from 'src/Application/School/Command/Type/CreateSchoolTypeCommandHandler';
import { GetSchoolTypeByIdQueryHandler } from 'src/Application/School/Query/Type/GetSchoolTypeByIdQueryHandler';
import { GetSchoolTypesQueryHandler } from 'src/Application/School/Query/Type/GetSchoolTypesQueryHandler';
import { IsSchoolTypeAlreadyExist } from 'src/Domain/School/Specification/Type/IsSchoolTypeAlreadyExist';
import { GetSchoolTypeAction } from './Action/Type/GetSchoolTypeAction';
import { CreateSchoolTypeAction } from './Action/Type/CreateSchoolTypeAction';
import { GetSchoolTypesAction } from './Action/Type/GetSchoolTypesAction';
import { UpdateSchoolTypeAction } from './Action/Type/UpdateSchoolTypeAction';
import { RemoveSchoolTypeCommandHandler } from 'src/Application/School/Command/Type/RemoveSchoolTypeCommandHandler';
import { RemoveSchoolTypeAction } from './Action/Type/RemoveSchoolTypeAction';
import { User } from 'src/Domain/User/User.entity';
import { AssignDirectorToSchoolCommandHandler } from 'src/Application/School/Command/AssignDirectorToSchoolCommandHandler';
import { UserRepository } from '../User/Repository/UserRepository';
import { AssignDirectorToSchoolAction } from './Action/AssignDirectorToSchoolAction';

@Module({
  imports: [
    BusModule,
    TypeOrmModule.forFeature([
      School,
      Photo,
      AccessToken,
      SchoolProduct,
      Product,
      SchoolType,
      User
    ])
  ],
  controllers: [
    GetSchoolsAction,
    CreateSchoolAction,
    GetSchoolAction,
    UpdateSchoolAction,
    AssignDirectorToSchoolAction,
    CreateSchoolProductAction,
    GetSchoolProductAction,
    CountSchoolProductsAction,
    GetSchoolProductsAction,
    UpdateSchoolProductAction,
    RemoveSchoolProductAction,
    GetSchoolTypesAction,
    CreateSchoolTypeAction,
    GetSchoolTypeAction,
    UpdateSchoolTypeAction,
    RemoveSchoolTypeAction,
  ],
  providers: [
    { provide: 'IPhotoRepository', useClass: PhotoRepository },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IAccessTokenRepository', useClass: AccessTokenRepository },
    { provide: 'ISchoolRepository', useClass: SchoolRepository },
    { provide: 'ISchoolProductRepository', useClass: SchoolProductRepository },
    { provide: 'ISchoolTypeRepository', useClass: SchoolTypeRepository },
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
    GetSchoolProductByIdQueryHandler,
    RemoveSchoolProductCommandHandler,
    CountSchoolProductsQueryHandler,
    UpdateSchoolTypeCommandHandler,
    CreateSchoolTypeCommandHandler,
    GetSchoolTypeByIdQueryHandler,
    GetSchoolTypesQueryHandler,
    IsSchoolTypeAlreadyExist,
    RemoveSchoolTypeCommandHandler,
    AssignDirectorToSchoolCommandHandler
  ]
})
export class SchoolModule {}
