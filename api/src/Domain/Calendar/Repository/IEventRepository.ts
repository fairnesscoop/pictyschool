import { Event } from '../Event.entity';

export interface IEventRepository {
  save(event: Event): Promise<Event>;
}
