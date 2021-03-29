import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateLeadCommandHandler } from 'src/Application/Lead/Command/CreateLeadCommandHandler';
import { GetLeadsQueryHandler } from 'src/Application/Lead/Query/GetLeadsQueryHandler';
import { Lead } from 'src/Domain/Lead/Lead.entity';
import { IsLeadAlreadyExist } from 'src/Domain/Lead/Specification/IsLeadAlreadyExist';
import { BusModule } from '../bus.module';
import { CreateLeadAction } from './Action/CreateLeadAction';
import { GetLeadsAction } from './Action/GetSchoolsAction';
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
    CreateLeadAction
  ],
  providers: [
    { provide: 'ILeadRepository', useClass: LeadRepository },
    GetLeadsQueryHandler,
    IsLeadAlreadyExist,
    CreateLeadCommandHandler
  ]
})
export class LeadModule {}
