import { Lead } from '../Lead.entity';

export interface ILeadRepository {
  save(lead: Lead): Promise<Lead>;
  findLeads(page: number): Promise<[Lead[], number]>;
}
