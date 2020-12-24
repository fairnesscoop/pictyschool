import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photographer } from 'src/Domain/User/Photographer.entity';
import { PasswordEncoderAdapter } from '../Adapter/PasswordEncoderAdapter';
import { BusModule } from '../bus.module';
import { PhotographerRepository } from './Repository/PhotographerRepository';
import { PhotographerStrategy } from './Security/PhotographerStrategy';

@Module({
  imports: [
    BusModule,
    PassportModule,
    TypeOrmModule.forFeature([Photographer])
  ],
  controllers: [],
  providers: [
    { provide: 'IPhotographerRepository', useClass: PhotographerRepository },
    { provide: 'IPasswordEncoder', useClass: PasswordEncoderAdapter },
    PhotographerStrategy,
  ]
})
export class UserModule {}
