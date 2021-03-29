import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetLeadsQueryHandler } from 'src/Application/Lead/Query/GetLeadsQueryHandler';
import { Lead } from 'src/Domain/Lead/Lead.entity';
import { BusModule } from '../bus.module';
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
    GetLeadsAction
  ],
  providers: [
    { provide: 'ILeadRepository', useClass: LeadRepository },
    GetLeadsQueryHandler
  ]
})
export class LeadModule {}
