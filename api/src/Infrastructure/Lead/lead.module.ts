import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateLeadCommandHandler } from 'src/Application/Lead/Command/CreateLeadCommandHandler';
import { RemoveLeadCommandHandler } from 'src/Application/Lead/Command/RemoveLeadCommandHandler';
import { GetLeadByIdQueryHandler } from 'src/Application/Lead/Query/GetLeadByIdQueryHandler';
import { GetLeadsQueryHandler } from 'src/Application/Lead/Query/GetLeadsQueryHandler';
import { Lead } from 'src/Domain/Lead/Lead.entity';
import { IsLeadAlreadyExist } from 'src/Domain/Lead/Specification/IsLeadAlreadyExist';
import { BusModule } from '../bus.module';
import { CreateLeadAction } from './Action/CreateLeadAction';
import { GetLeadAction } from './Action/GetLeadAction';
import { GetLeadsAction } from './Action/GetSchoolsAction';
import { RemoveLeadAction } from './Action/RemoveLeadAction';
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
    RemoveLeadAction
  ],
  providers: [
    { provide: 'ILeadRepository', useClass: LeadRepository },
    GetLeadsQueryHandler,
    IsLeadAlreadyExist,
    CreateLeadCommandHandler,
    RemoveLeadCommandHandler,
    GetLeadByIdQueryHandler
  ]
})
export class LeadModule {}
