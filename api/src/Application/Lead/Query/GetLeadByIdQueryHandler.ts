import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetLeadByIdQuery } from './GetLeadByIdQuery';
import { ILeadRepository } from 'src/Domain/Lead/Repository/ILeadRepository';
import { LeadNotFoundException } from 'src/Domain/Lead/Exception/LeadNotFoundException';
import { LeadView } from '../View/LeadView';

@QueryHandler(GetLeadByIdQuery)
export class GetLeadByIdQueryHandler {
  constructor(
    @Inject('ILeadRepository')
    private readonly leadRepository: ILeadRepository
  ) {}

  public async execute(query: GetLeadByIdQuery): Promise<LeadView> {
    const lead = await this.leadRepository.findOneById(query.id);
    if (!lead) {
      throw new LeadNotFoundException();
    }

    return new LeadView(
      lead.getId(),
      lead.getReference(),
      lead.getName(),
      lead.getAddress(),
      lead.getZipCode(),
      lead.getCity(),
      lead.getEmail(),
      lead.getPhoneNumber(),
      lead.getStatus(),
      lead.getType(),
      lead.getNumberOfStudents()
    );
  }
}
