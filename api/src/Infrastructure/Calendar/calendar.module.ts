import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateEventCommandHandler } from 'src/Application/Calendar/Command/CreateEventCommandHandler';
import { Event } from 'src/Domain/Calendar/Event.entity';
import { School } from 'src/Domain/School/School.entity';
import { User } from 'src/Domain/User/User.entity';
import { BusModule } from '../bus.module';
import { SchoolRepository } from '../School/Repository/SchoolRepository';
import { UserRepository } from '../User/Repository/UserRepository';
import { CreateEventAction } from './Action/CreateEventAction';
import { EventRepository } from './Repository/EventRepository';

@Module({
  imports: [
    BusModule,
    TypeOrmModule.forFeature([
      Event,
      School,
      User
    ])
  ],
  controllers: [
    CreateEventAction
  ],
  providers: [
    { provide: 'IEventRepository', useClass: EventRepository },
    { provide: 'ISchoolRepository', useClass: SchoolRepository },
    { provide: 'IUserRepository', useClass: UserRepository },
    CreateEventCommandHandler
  ]
})
export class CalendarModule {}
