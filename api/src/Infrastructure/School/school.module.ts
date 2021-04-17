import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from 'src/Domain/School/Photo.entity';
import { School } from 'src/Domain/School/School.entity';
import { PhotoRepository } from './Repository/PhotoRepository';
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
import { AddUserToSchoolCommandHandler } from 'src/Application/School/Command/User/AddUserToSchoolCommandHandler';
import { UserRepository } from '../User/Repository/UserRepository';
import { AddOrInviteUserToSchoolAction } from './Action/User/AddOrInviteUserToSchoolAction';
import { CanUserAccessToSchool } from 'src/Domain/User/Specification/CanUserAccessToSchool';
import { SchoolUser } from 'src/Domain/School/SchoolUser.entity';
import { SchoolUserRepository } from './Repository/SchoolUserRepository';
import { IsUserAlreadyAddedToSchool } from 'src/Domain/User/Specification/IsUserAlreadyAddedToSchool';
import { GetSchoolUsersAction } from './Action/User/GetSchoolUsersAction';
import { GetSchoolUsersQueryHandler } from 'src/Application/School/Query/User/GetSchoolUsersQueryHandler';
import { CodeGeneratorAdapter } from '../Adapter/CodeGeneratorAdapter';
import { VoucherRepository } from './Repository/VoucherRepository';
import { Voucher } from 'src/Domain/School/Voucher.entity';
import { GetUserByEmailQueryHandler } from 'src/Application/User/Query/GetUserByEmailQueryHandler';
import { IsVoucherAlreadyGenerated } from 'src/Domain/School/Specification/IsVoucherAlreadyGenerated';
import { CreateVoucherCommandHandler } from 'src/Application/School/Command/Voucher/CreateVoucherCommandHandler';
import { GetSchoolVouchersQueryHandler } from 'src/Application/School/Query/Voucher/GetSchoolVouchersQueryHandler';
import { RemoveVoucherCommandHandler } from 'src/Application/School/Command/Voucher/RemoveVoucherCommandHandler';
import { RemoveSchoolUserAction } from './Action/User/RemoveSchoolUserAction';
import { RemoveSchoolUserCommandHandler } from 'src/Application/School/Command/User/RemoveSchoolUserCommandHandler';
import { ConsumeVoucherAction } from './Action/Voucher/ConsumeVoucherAction';
import { RemoveVoucherAction } from './Action/Voucher/RemoveVoucherAction';
import { GetVoucherByCodeQueryHandler } from 'src/Application/School/Query/Voucher/GetVoucherByCodeQueryHandler';
import { Shooting } from 'src/Domain/School/Shooting.entity';
import { ShootingRepository } from './Repository/ShootingRepository';

@Module({
  imports: [
    BusModule,
    TypeOrmModule.forFeature([
      School,
      Photo,
      SchoolProduct,
      SchoolUser,
      Product,
      User,
      Shooting,
      Voucher
    ])
  ],
  controllers: [
    GetSchoolsAction,
    CreateSchoolAction,
    GetSchoolAction,
    UpdateSchoolAction,
    AddOrInviteUserToSchoolAction,
    GetSchoolUsersAction,
    RemoveSchoolUserAction,
    CreateSchoolProductAction,
    GetSchoolProductAction,
    CountSchoolProductsAction,
    GetSchoolProductsAction,
    UpdateSchoolProductAction,
    RemoveSchoolProductAction,
    ConsumeVoucherAction,
    RemoveVoucherAction,
  ],
  providers: [
    { provide: 'ICodeGenerator', useClass: CodeGeneratorAdapter },
    { provide: 'IPhotoRepository', useClass: PhotoRepository },
    { provide: 'ISchoolUserRepository', useClass: SchoolUserRepository },
    { provide: 'IVoucherRepository', useClass: VoucherRepository },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'ISchoolRepository', useClass: SchoolRepository },
    { provide: 'ISchoolProductRepository', useClass: SchoolProductRepository },
    { provide: 'IProductRepository', useClass: ProductRepository },
    { provide: 'IShootingRepository', useClass: ShootingRepository },
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
    AddUserToSchoolCommandHandler,
    CanUserAccessToSchool,
    IsUserAlreadyAddedToSchool,
    GetSchoolUsersQueryHandler,
    GetUserByEmailQueryHandler,
    IsVoucherAlreadyGenerated,
    CreateVoucherCommandHandler,
    GetSchoolVouchersQueryHandler,
    RemoveVoucherCommandHandler,
    RemoveSchoolUserCommandHandler,
    GetVoucherByCodeQueryHandler
  ]
})
export class SchoolModule {}
