import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetEventByIdQuery } from './GetEventByIdQuery';
import { EventDetailView } from '../View/EventDetailView';
import { IEventRepository } from 'src/Domain/Calendar/Repository/IEventRepository';
import { EventNotFoundException } from 'src/Domain/Calendar/Exception/EventNotFoundException';
import { SchoolSummaryView } from 'src/Application/School/View/SchoolSummaryView';

@QueryHandler(GetEventByIdQuery)
export class GetEventByIdQueryHandler {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository
  ) {}

  public async execute({ id }: GetEventByIdQuery): Promise<EventDetailView> {
    const event = await this.eventRepository.findOneById(id);
    if (!event) {
      throw new EventNotFoundException();
    }

    const school = event.getSchool();
    const user = event.getPhotographer();

    return new EventDetailView(
      event.getId(),
      new SchoolSummaryView(
        school.getId(),
        school.getName(),
        school.getReference(),
        school.getAddress(),
        school.getCity(),
        school.getZipCode(),
      ),
      user.getFirstName(),
      user.getLastName(),
      event.getDate(),
      event.getSummary()
    );
  }
}
