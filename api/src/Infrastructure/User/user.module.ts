import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginQueryHandler } from 'src/Application/User/Query/LoginQueryHandler';
import { Photographer } from 'src/Domain/User/Photographer.entity';
import { PasswordEncoderAdapter } from '../Adapter/PasswordEncoderAdapter';
import { BusModule } from '../bus.module';
import { LoginAction } from './Action/LoginAction';
import { PhotographerRepository } from './Repository/PhotographerRepository';
import { PhotographerStrategy } from './Security/PhotographerStrategy';

@Module({
  imports: [
    BusModule,
    PassportModule,
    TypeOrmModule.forFeature([Photographer])
  ],
  controllers: [LoginAction],
  providers: [
    { provide: 'IPhotographerRepository', useClass: PhotographerRepository },
    { provide: 'IPasswordEncoder', useClass: PasswordEncoderAdapter },
    PhotographerStrategy,
    LoginQueryHandler
  ]
})
export class UserModule {}
