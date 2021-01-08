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

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([School, Photo, AccessToken, SchoolProduct])],
  controllers: [
    GetSchoolsAction,
    CreateSchoolAction,
    GetSchoolAction,
    UpdateSchoolAction
  ],
  providers: [
    { provide: 'IPhotoRepository', useClass: PhotoRepository },
    { provide: 'IAccessTokenRepository', useClass: AccessTokenRepository },
    { provide: 'ISchoolRepository', useClass: SchoolRepository },
    { provide: 'ISchoolProductRepository', useClass: SchoolProductRepository },
    IsSchoolAlreadyExist,
    CreateSchoolCommandHandler,
    GetSchoolsQueryHandler,
    GetSchoolByIdQueryHandler,
    UpdateSchoolCommandHandler
  ]
})
export class SchoolModule {}
