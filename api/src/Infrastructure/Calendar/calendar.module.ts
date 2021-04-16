import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateEventCommandHandler } from 'src/Application/Calendar/Command/CreateEventCommandHandler';
import { RemoveEventCommandHandler } from 'src/Application/Calendar/Command/RemoveEventCommandHandler';
import { UpdateEventCommandHandler } from 'src/Application/Calendar/Command/UpdateEventCommandHandler';
import { GetEventByIdQueryHandler } from 'src/Application/Calendar/Query/GetEventByIdQueryHandler';
import { GetEventsByPeriodQueryHandler } from 'src/Application/Calendar/Query/GetEventsByPeriodQueryHandler';
import { Event } from 'src/Domain/Calendar/Event.entity';
import { School } from 'src/Domain/School/School.entity';
import { User } from 'src/Domain/User/User.entity';
import { BusModule } from '../bus.module';
import { SchoolRepository } from '../School/Repository/SchoolRepository';
import { UserRepository } from '../User/Repository/UserRepository';
import { CreateEventAction } from './Action/CreateEventAction';
import { GetEventAction } from './Action/GetEventAction';
import { GetEventsAction } from './Action/GetEventsAction';
import { RemoveEventAction } from './Action/RemoveEventAction';
import { UpdateEventAction } from './Action/UpdateEventAction';
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
    GetEventsAction,
    CreateEventAction,
    GetEventAction,
    UpdateEventAction,
    RemoveEventAction
  ],
  providers: [
    { provide: 'IEventRepository', useClass: EventRepository },
    { provide: 'ISchoolRepository', useClass: SchoolRepository },
    { provide: 'IUserRepository', useClass: UserRepository },
    CreateEventCommandHandler,
    GetEventsByPeriodQueryHandler,
    GetEventByIdQueryHandler,
    RemoveEventCommandHandler,
    UpdateEventCommandHandler
  ]
})
export class CalendarModule {}
