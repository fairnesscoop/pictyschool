import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetLeadsQuery } from './GetLeadsQuery';
import { Pagination } from 'src/Application/Common/Pagination';
import { ILeadRepository } from 'src/Domain/Lead/Repository/ILeadRepository';
import { LeadView } from '../View/LeadView';

@QueryHandler(GetLeadsQuery)
export class GetLeadsQueryHandler {
  constructor(
    @Inject('ILeadRepository')
    private readonly leadRepository: ILeadRepository
  ) {}

  public async execute(query: GetLeadsQuery): Promise<Pagination<LeadView>> {
    const { page } = query;
    const leadViews: LeadView[] = [];
    const [ leads, total ] = await this.leadRepository.findLeads(page);

    for (const lead of leads) {
      leadViews.push(
        new LeadView(
          lead.getId(),
          lead.getName(),
          lead.getReference(),
          lead.getAddress(),
          lead.getCity(),
          lead.getZipCode(),
          lead.getEmail(),
          lead.getPhoneNumber(),
          lead.getNumberOfStudents(),
        )
      );
    }

    return new Pagination<LeadView>(leadViews, total);
  }
}
