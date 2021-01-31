import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateProfileCommandHandler } from 'src/Application/User/Command/UpdateProfileCommandHandler';
import { GetPhotographerByIdQueryHandler } from 'src/Application/User/Query/GetPhotographerByIdQueryHandler';
import { PhotographerLoginQueryHandler } from 'src/Application/User/Query/PhotographerLoginQueryHandler';
import { Photographer } from 'src/Domain/User/Photographer.entity';
import { IsEmailAlreadyExist } from 'src/Domain/User/Specification/IsEmailAlreadyExist';
import { PasswordEncoderAdapter } from '../Adapter/PasswordEncoderAdapter';
import { BusModule } from '../bus.module';
import { GetMeAction } from './Action/GetMeAction';
import { PhotographerLoginAction } from './Action/PhotographerLoginAction';
import { UpdateMeAction } from './Action/UpdateMeAction';
import { PhotographerRepository } from './Repository/PhotographerRepository';
import { BearerStrategy } from './Security/BearerStrategy';
import { RolesGuard } from './Security/RolesGuard';

@Module({
  imports: [
    BusModule,
    PassportModule,
    TypeOrmModule.forFeature([Photographer])
  ],
  controllers: [PhotographerLoginAction, UpdateMeAction, GetMeAction],
  providers: [
    { provide: 'IPhotographerRepository', useClass: PhotographerRepository },
    { provide: 'IPasswordEncoder', useClass: PasswordEncoderAdapter },
    BearerStrategy,
    PhotographerLoginQueryHandler,
    IsEmailAlreadyExist,
    UpdateProfileCommandHandler,
    GetPhotographerByIdQueryHandler,
    RolesGuard
  ]
})
export class UserModule {}
