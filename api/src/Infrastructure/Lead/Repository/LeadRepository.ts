import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead } from 'src/Domain/Lead/Lead.entity';
import { ILeadRepository } from 'src/Domain/Lead/Repository/ILeadRepository';
import { MAX_ITEMS_PER_PAGE } from 'src/Application/Common/Pagination';

@Injectable()
export class LeadRepository implements ILeadRepository {
  constructor(
    @InjectRepository(Lead)
    private readonly repository: Repository<Lead>
  ) {}

  public save(lead: Lead): Promise<Lead> {
    return this.repository.save(lead);
  }

  public remove(lead: Lead): void {
    this.repository.delete(lead.getId());
  }

  public findLeads(page = 1): Promise<[Lead[], number]> {
    return this.repository
      .createQueryBuilder('lead')
      .select([
        'lead.id',
        'lead.name',
        'lead.reference',
        'lead.address',
        'lead.city',
        'lead.zipCode',
        'lead.type',
        'lead.status',
        'lead.email',
        'lead.phoneNumber',
        'lead.numberOfStudents'
      ])
      .orderBy('lead.zipCode', 'ASC')
      .limit(MAX_ITEMS_PER_PAGE)
      .offset((page - 1) * MAX_ITEMS_PER_PAGE)
      .getManyAndCount();
  }

  public findOneByRef(reference: string): Promise<Lead | undefined> {
    return this.repository
      .createQueryBuilder('lead')
      .select([ 'lead.id' ])
      .where('lower(lead.reference) = :reference', { reference: reference.toLowerCase() })
      .getOne();
  }

  public findOneById(id: string): Promise<Lead | undefined> {
    return this.repository
      .createQueryBuilder('lead')
      .select([ 
        'lead.id',
        'lead.name',
        'lead.reference',
        'lead.address',
        'lead.city',
        'lead.zipCode',
        'lead.email',
        'lead.type',
        'lead.status',
        'lead.phoneNumber',
        'lead.numberOfStudents'
       ])
      .where('lead.id = :id', { id })
      .getOne();
  }
}