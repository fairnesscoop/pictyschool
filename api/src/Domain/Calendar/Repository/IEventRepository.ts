import { Event } from '../Event.entity';

export interface IEventRepository {
  save(event: Event): Promise<Event>;
  findByPeriod(fromDate: Date, toDate: Date): Promise<Event[]>;
}
