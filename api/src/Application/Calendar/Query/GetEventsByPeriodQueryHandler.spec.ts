import { mock, instance, when, verify, deepEqual } from 'ts-mockito';
import { Event } from 'src/Domain/Calendar/Event.entity';
import { EventRepository } from 'src/Infrastructure/Calendar/Repository/EventRepository';
import { School } from 'src/Domain/School/School.entity';
import { User } from 'src/Domain/User/User.entity';
import { GetEventsByPeriodQueryHandler } from './GetEventsByPeriodQueryHandler';
import { GetEventsByPeriodQuery } from './GetEventsByPeriodQuery';
import { EventView } from '../View/EventView';

describe('GetEventsByPeriodQueryHandler', () => {
  it('testGetEvents', async () => {
    const eventRepository = mock(EventRepository);
    const date = new Date('2021-04-10');

    const photographer = mock(User);
    when(photographer.getFirstName()).thenReturn('Mathieu');
    when(photographer.getLastName()).thenReturn('MARCHOIS');

    const school = mock(School);
    when(school.getName()).thenReturn('Ecole maternelle Belliard');
    when(school.getReference()).thenReturn('LM209');

    const event = mock(Event);
    when(event.getId()).thenReturn('bf4a645c-9754-4943-baec-783361c6d814');
    when(event.getDate()).thenReturn(date);
    when(event.getSummary()).thenReturn('prise de vue');
    when(event.getSchool()).thenReturn(instance(school));
    when(event.getPhotographer()).thenReturn(instance(photographer));

    when(
      eventRepository.findByPeriod(
        deepEqual(new Date('2021-04-01')),
        deepEqual(new Date('2021-04-15'))
      )
    ).thenResolve([instance(event)]);

    const queryHandler = new GetEventsByPeriodQueryHandler(instance(eventRepository));

    expect(
      await queryHandler.execute(
        new GetEventsByPeriodQuery(
          new Date('2021-04-01'),
          new Date('2021-04-15')
        )
      )
    ).toMatchObject(
      [
        new EventView(
          'bf4a645c-9754-4943-baec-783361c6d814',
          '[Mathieu MARCHOIS] Ecole maternelle Belliard - LM209',
          date,
          'prise de vue',
        )
      ],
    );

    verify(
      eventRepository.findByPeriod(
        deepEqual(new Date('2021-04-01')),
        deepEqual(new Date('2021-04-15'))
      )
    ).once();
  });
});
