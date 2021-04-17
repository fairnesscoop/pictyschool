import { mock, instance, when, verify } from 'ts-mockito';
import { GetEventByIdQueryHandler } from './GetEventByIdQueryHandler';
import { GetEventByIdQuery } from './GetEventByIdQuery';
import { Status, Type } from 'src/Domain/School/AbstractSchool';
import { EventRepository } from 'src/Infrastructure/Calendar/Repository/EventRepository';
import { EventDetailView } from '../View/EventDetailView';
import { SchoolSummaryView } from 'src/Application/School/View/SchoolSummaryView';
import { Event } from 'src/Domain/Calendar/Event.entity';
import { User } from 'src/Domain/User/User.entity';
import { School } from 'src/Domain/School/School.entity';
import { EventNotFoundException } from 'src/Domain/Calendar/Exception/EventNotFoundException';
import { UserSummaryView } from 'src/Application/User/View/UserSummaryView';

describe('GetEventByIdQueryHandler', () => {
  const query = new GetEventByIdQuery('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
  let eventRepository: EventRepository;
  let queryHandler: GetEventByIdQueryHandler;
  let event: Event;

  beforeEach(() => {
    event = mock(Event);
    eventRepository = mock(EventRepository);
    queryHandler = new GetEventByIdQueryHandler(instance(eventRepository));
  });

  it('testGetEvent', async () => {
    const expectedResult = new EventDetailView(
      'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
      new SchoolSummaryView(
        'd54f15d6-1a1d-47e8-8672-9f46018f9960',
        'Ecole maternelle Belliard',
        'LM290',
        '10 rue Belliard',
        'Paris',
        '75018'
      ),
      new UserSummaryView(
        '484f0ddd-9a44-4f6d-9d4e-cdeded631e39',
        'Mathieu',
        'MARCHOIS',
        'mathieu@fairness.coop'
      ),
      new Date('2021-04-01'),
      'Prise de vue'
    );

    const photographer = mock(User);
    when(photographer.getId()).thenReturn('484f0ddd-9a44-4f6d-9d4e-cdeded631e39');
    when(photographer.getFirstName()).thenReturn('Mathieu');
    when(photographer.getLastName()).thenReturn('MARCHOIS');
    when(photographer.getEmail()).thenReturn('mathieu@fairness.coop');

    const school = mock(School);
    when(school.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(school.getName()).thenReturn('Ecole maternelle Belliard');
    when(school.getAddress()).thenReturn('10 rue Belliard');
    when(school.getZipCode()).thenReturn('75018');
    when(school.getCity()).thenReturn('Paris');
    when(school.getReference()).thenReturn('LM290');

    when(event.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(event.getDate()).thenReturn(new Date('2021-04-01'));
    when(event.getSummary()).thenReturn('Prise de vue');
    when(event.getSchool()).thenReturn(instance(school));
    when(event.getPhotographer()).thenReturn(instance(photographer));

    when(
      eventRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(event));
    expect(await queryHandler.execute(query)).toMatchObject(expectedResult);

    verify(
      eventRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
  });

  it('testGetEventNotFound', async () => {
    when(
      eventRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(null);

    try {
      expect(await queryHandler.execute(query)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(EventNotFoundException);
      expect(e.message).toBe('calendar.errors.event_not_found');
      verify(
        eventRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
    }
  });
});
