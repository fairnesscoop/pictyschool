import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { GetEventsByPeriodQuery } from './GetEventsByPeriodQuery';
import { IEventRepository } from 'src/Domain/Calendar/Repository/IEventRepository';
import { EventView } from '../View/EventView';

@QueryHandler(GetEventsByPeriodQuery)
export class GetEventsByPeriodQueryHandler {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository
  ) {}

  public async execute(query: GetEventsByPeriodQuery): Promise<EventView[]> {
    const { fromDate, toDate } = query;
    const eventViews: EventView[] = [];
    const events = await this.eventRepository.findByPeriod(fromDate, toDate);

    for (const event of events) {
      const user = event.getPhotographer();
      const school = event.getSchool();
      const schoolInformation = `${school.getName()} - ${school.getReference()}`;
      const userInformation = `${user.getFirstName()} ${user.getLastName()}`;

      eventViews.push(
        new EventView(
          event.getId(),
          `[${userInformation}] ${schoolInformation}`,
          event.getDate(),
          event.getSummary()
        )
      );
    }

    return eventViews;
  }
}
