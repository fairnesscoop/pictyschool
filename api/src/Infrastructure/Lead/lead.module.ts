import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateLeadCommandHandler } from 'src/Application/Lead/Command/CreateLeadCommandHandler';
import { RemoveLeadCommandHandler } from 'src/Application/Lead/Command/RemoveLeadCommandHandler';
import { UpdateLeadCommandHandler } from 'src/Application/Lead/Command/UpdateLeadCommandHandler';
import { GetLeadByIdQueryHandler } from 'src/Application/Lead/Query/GetLeadByIdQueryHandler';
import { GetLeadsQueryHandler } from 'src/Application/Lead/Query/GetLeadsQueryHandler';
import { Lead } from 'src/Domain/Lead/Lead.entity';
import { IsLeadAlreadyExist } from 'src/Domain/Lead/Specification/IsLeadAlreadyExist';
import { BusModule } from '../bus.module';
import { CreateLeadAction } from './Action/CreateLeadAction';
import { GetLeadAction } from './Action/GetLeadAction';
import { GetLeadsAction } from './Action/GetSchoolsAction';
import { RemoveLeadAction } from './Action/RemoveLeadAction';
import { UpdateLeadAction } from './Action/UpdateLeadAction';
import { LeadRepository } from './Repository/LeadRepository';

@Module({
  imports: [
    BusModule,
    TypeOrmModule.forFeature([
      Lead
    ])
  ],
  controllers: [
    GetLeadsAction,
    CreateLeadAction,
    GetLeadAction,
    UpdateLeadAction,
    RemoveLeadAction
  ],
  providers: [
    { provide: 'ILeadRepository', useClass: LeadRepository },
    GetLeadsQueryHandler,
    IsLeadAlreadyExist,
    CreateLeadCommandHandler,
    RemoveLeadCommandHandler,
    GetLeadByIdQueryHandler,
    UpdateLeadCommandHandler
  ]
})
export class LeadModule {}
