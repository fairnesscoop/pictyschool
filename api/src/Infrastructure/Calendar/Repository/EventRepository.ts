import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/Domain/Calendar/Event.entity';
import { IEventRepository } from 'src/Domain/Calendar/Repository/IEventRepository';

@Injectable()
export class EventRepository implements IEventRepository {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>
  ) {}

  public save(event: Event): Promise<Event> {
    return this.repository.save(event);
  }

  public findByPeriod(fromDate: Date, toDate: Date): Promise<Event[]> {
    return this.repository
      .createQueryBuilder('event')
      .select([
        'event.id',
        'school.name',
        'school.reference',
        'photographer.firstName',
        'photographer.lastName',
        'event.date'
      ])
      .innerJoin('event.school', 'school')
      .innerJoin('event.photographer', 'photographer')
      .where('event.date >= :fromDate', { fromDate })
      .andWhere('event.date <= :toDate', { toDate })
      .getMany();
  }
}
