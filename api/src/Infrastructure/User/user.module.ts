import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateProfileCommandHandler } from 'src/Application/User/Command/UpdateProfileCommandHandler';
import { GetUserByIdQueryHandler } from 'src/Application/User/Query/GetUserByIdQueryHandler';
import { UserLoginQueryHandler } from 'src/Application/User/Query/UserLoginQueryHandler';
import { User } from 'src/Domain/User/User.entity';
import { IsEmailAlreadyExist } from 'src/Domain/User/Specification/IsEmailAlreadyExist';
import { PasswordEncoderAdapter } from '../Adapter/PasswordEncoderAdapter';
import { BusModule } from '../bus.module';
import { GetMeAction } from './Action/GetMeAction';
import { UserLoginAction } from './Action/UserLoginAction';
import { UpdateMeAction } from './Action/UpdateMeAction';
import { UserRepository } from './Repository/UserRepository';
import { BearerStrategy } from './Security/BearerStrategy';
import { RolesGuard } from './Security/RolesGuard';

@Module({
  imports: [
    BusModule,
    PassportModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserLoginAction, UpdateMeAction, GetMeAction],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IPasswordEncoder', useClass: PasswordEncoderAdapter },
    BearerStrategy,
    UserLoginQueryHandler,
    IsEmailAlreadyExist,
    UpdateProfileCommandHandler,
    GetUserByIdQueryHandler,
    RolesGuard
  ]
})
export class UserModule {}
