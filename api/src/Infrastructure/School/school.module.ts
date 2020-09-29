import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from 'src/Domain/School/Photo.entity';
import { School } from 'src/Domain/School/School.entity';
import { AccessToken } from 'src/Domain/School/AccessToken.entity';
import { PhotoRepository } from './Repository/PhotoRepository';
import { AccessTokenRepository } from './Repository/AccessTokenRepository';
import { SchoolRepository } from './Repository/SchoolRepository';

@Module({
  imports: [TypeOrmModule.forFeature([School, Photo, AccessToken])],
  controllers: [],
  providers: [
    { provide: 'IPhotoRepository', useClass: PhotoRepository },
    { provide: 'IAccessTokenRepository', useClass: AccessTokenRepository },
    { provide: 'ISchoolRepository', useClass: SchoolRepository }
  ]
})
export class SchoolModule {}
