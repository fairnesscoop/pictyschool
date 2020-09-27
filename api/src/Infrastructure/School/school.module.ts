import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from 'src/Domain/School/Photo.entity';
import { School } from 'src/Domain/School/School.entity';
import { AccessToken } from 'src/Domain/School/AccessToken.entity';

@Module({
  imports: [TypeOrmModule.forFeature([School, Photo, AccessToken])],
  controllers: [],
  providers: []
})
export class SchoolModule {}
