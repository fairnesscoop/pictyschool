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

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([School, Photo, AccessToken])],
  controllers: [CreateSchoolAction],
  providers: [
    { provide: 'IPhotoRepository', useClass: PhotoRepository },
    { provide: 'IAccessTokenRepository', useClass: AccessTokenRepository },
    { provide: 'ISchoolRepository', useClass: SchoolRepository },
    IsSchoolAlreadyExist,
    CreateSchoolCommandHandler
  ]
})
export class SchoolModule {}
