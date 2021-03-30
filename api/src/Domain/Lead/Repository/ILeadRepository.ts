import { Lead } from '../Lead.entity';

export interface ILeadRepository {
  save(lead: Lead): Promise<Lead>;
  findLeads(page: number): Promise<[Lead[], number]>;
  findOneByRef(reference: string): Promise<Lead | undefined>;
  findOneById(id: string): Promise<Lead | undefined>;
  remove(lead: Lead): void;
}
