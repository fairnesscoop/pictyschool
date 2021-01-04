import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateProfileCommandHandler } from 'src/Application/User/Command/UpdateProfileCommandHandler';
import { GetPhotographerByIdQueryHandler } from 'src/Application/User/Query/GetPhotographerByIdQueryHandler';
import { LoginQueryHandler } from 'src/Application/User/Query/LoginQueryHandler';
import { Photographer } from 'src/Domain/User/Photographer.entity';
import { IsEmailAlreadyExist } from 'src/Domain/User/Specification/IsEmailAlreadyExist';
import { PasswordEncoderAdapter } from '../Adapter/PasswordEncoderAdapter';
import { BusModule } from '../bus.module';
import { GetMeAction } from './Action/GetMeAction';
import { LoginAction } from './Action/LoginAction';
import { UpdateMeAction } from './Action/UpdateMeAction';
import { PhotographerRepository } from './Repository/PhotographerRepository';
import { PhotographerStrategy } from './Security/PhotographerStrategy';

@Module({
  imports: [
    BusModule,
    PassportModule,
    TypeOrmModule.forFeature([Photographer])
  ],
  controllers: [LoginAction, UpdateMeAction, GetMeAction],
  providers: [
    { provide: 'IPhotographerRepository', useClass: PhotographerRepository },
    { provide: 'IPasswordEncoder', useClass: PasswordEncoderAdapter },
    PhotographerStrategy,
    LoginQueryHandler,
    IsEmailAlreadyExist,
    UpdateProfileCommandHandler,
    GetPhotographerByIdQueryHandler
  ]
})
export class UserModule {}
