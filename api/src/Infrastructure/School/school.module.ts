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
import { CreateShootingAction } from './Action/Shooting/CreateShootingAction';
import { CreateShootingCommandHandler } from 'src/Application/School/Command/Shooting/CreateShootingCommandHandler';
import { GetShootingsBySchoolQueryHandler } from 'src/Application/School/Query/Shooting/GetShootingsBySchoolQueryHandler';
import { GetSchoolShootingsAction } from './Action/Shooting/GetSchoolShootingsAction';
import { CountShootingsBySchoolQueryHandler } from 'src/Application/School/Query/Shooting/CountShootingsBySchoolQueryHandler';
import { CountSchoolShootingsAction } from './Action/Shooting/CountSchoolShootingsAction';
import { Discount } from 'src/Domain/School/Discount.entity';
import { DiscountRepository } from './Repository/DiscountRepository';
import { IsDiscountAlreadyExist } from 'src/Domain/School/Specification/Discount/IsDiscountAlreadyExist';
import { CreateDiscountCommandHandler } from 'src/Application/School/Command/Discount/CreateDiscountCommandHandler';
import { GetSchoolDiscountsAction } from './Action/Discount/GetSchoolDiscountsAction';
import { CountSchoolDiscountsAction } from './Action/Discount/CountSchoolDiscountsAction';
import { CreateDiscountAction } from './Action/Discount/CreateDiscountAction';
import { GetDiscountsBySchoolQueryHandler } from 'src/Application/School/Query/Discount/GetDiscountsBySchoolQueryHandler';
import { CountDiscountsBySchoolQueryHandler } from 'src/Application/School/Query/Discount/CountDiscountsBySchoolQueryHandler';
import { RemoveDiscountAction } from './Action/Discount/RemoveDiscountAction';
import { RemoveDiscountCommandHandler } from 'src/Application/School/Command/Discount/RemoveDiscountCommandHandler';
import { SchoolCreatedEventListener } from 'src/Application/School/EventListener/SchoolCreatedEventListener';
import { GetShootingByIdQueryHandler } from 'src/Application/School/Query/Shooting/GetShootingByIdQueryHandler';
import { GetShootingAction } from './Action/Shooting/GetShootingAction';

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
      Discount,
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
    GetSchoolShootingsAction,
    GetShootingAction,
    CreateShootingAction,
    CountSchoolShootingsAction,
    GetSchoolDiscountsAction,
    CreateDiscountAction,
    CountSchoolDiscountsAction,
    RemoveDiscountAction
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
    { provide: 'IDiscountRepository', useClass: DiscountRepository },
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
    GetVoucherByCodeQueryHandler,
    CreateShootingCommandHandler,
    GetShootingsBySchoolQueryHandler,
    CountShootingsBySchoolQueryHandler,
    IsDiscountAlreadyExist,
    CreateDiscountCommandHandler,
    GetDiscountsBySchoolQueryHandler,
    CountDiscountsBySchoolQueryHandler,
    RemoveDiscountCommandHandler,
    SchoolCreatedEventListener,
    GetShootingByIdQueryHandler
  ]
})
export class SchoolModule {}
