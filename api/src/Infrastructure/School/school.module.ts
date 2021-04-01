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
import { User } from 'src/Domain/User/User.entity';
import { AssignUserToSchoolCommandHandler } from 'src/Application/School/Command/User/AssignUserToSchoolCommandHandler';
import { UserRepository } from '../User/Repository/UserRepository';
import { AssignUserToSchoolAction } from './Action/User/AssignUserToSchoolAction';
import { CanUserAccessToSchool } from 'src/Domain/User/Specification/CanUserAccessToSchool';
import { SchoolUser } from 'src/Domain/School/SchoolUser.entity';
import { SchoolUserRepository } from './Repository/SchoolUserRepository';
import { IsUserAlreadyAssignedToSchool } from 'src/Domain/User/Specification/IsUserAlreadyAssignedToSchool';
import { GetSchoolUsersAction } from './Action/User/GetSchoolUsersAction';
import { GetSchoolUsersQueryHandler } from 'src/Application/School/Query/User/GetSchoolUsersQueryHandler';

@Module({
  imports: [
    BusModule,
    TypeOrmModule.forFeature([
      School,
      Photo,
      AccessToken,
      SchoolProduct,
      SchoolUser,
      Product,
      User
    ])
  ],
  controllers: [
    GetSchoolsAction,
    CreateSchoolAction,
    GetSchoolAction,
    UpdateSchoolAction,
    AssignUserToSchoolAction,
    GetSchoolUsersAction,
    CreateSchoolProductAction,
    GetSchoolProductAction,
    CountSchoolProductsAction,
    GetSchoolProductsAction,
    UpdateSchoolProductAction,
    RemoveSchoolProductAction,
  ],
  providers: [
    { provide: 'IPhotoRepository', useClass: PhotoRepository },
    { provide: 'ISchoolUserRepository', useClass: SchoolUserRepository },
    { provide: 'IUserRepository', useClass: UserRepository },
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
    GetSchoolProductByIdQueryHandler,
    RemoveSchoolProductCommandHandler,
    CountSchoolProductsQueryHandler,
    AssignUserToSchoolCommandHandler,
    CanUserAccessToSchool,
    IsUserAlreadyAssignedToSchool,
    GetSchoolUsersQueryHandler
  ]
})
export class SchoolModule {}
