import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photographer } from 'src/Domain/User/Photographer.entity';
import { PhotographerRepository } from './Repository/PhotographerRepository';

@Module({
  imports: [TypeOrmModule.forFeature([Photographer])],
  controllers: [],
  providers: [
    { provide: 'IPhotographerRepository', useClass: PhotographerRepository }
  ]
})
export class UserModule {}
