import { mock, instance, when, verify, anything } from 'ts-mockito';
import { RemoveEventCommandHandler } from './RemoveEventCommandHandler';
import { RemoveEventCommand } from './RemoveEventCommand';
import { EventRepository } from 'src/Infrastructure/Calendar/Repository/EventRepository';
import { Event } from 'src/Domain/Calendar/Event.entity';
import { EventNotFoundException } from 'src/Domain/Calendar/Exception/EventNotFoundException';

describe('RemoveEventCommandHandler', () => {
  let eventRepository: EventRepository;
  let removedEvent: Event;
  let handler: RemoveEventCommandHandler;

  const command = new RemoveEventCommand('17efcbee-bd2f-410e-9e99-51684b592bad');

  beforeEach(() => {
    eventRepository = mock(EventRepository);
    removedEvent = mock(Event);

    handler = new RemoveEventCommandHandler(
      instance(eventRepository)
    );
  });

  it('testEventRemovedSuccessfully', async () => {
    when(eventRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(instance(removedEvent));
    when(removedEvent.getId()).thenReturn(
      '17efcbee-bd2f-410e-9e99-51684b592bad'
    );
    when(
      eventRepository.save(instance(removedEvent))
    ).thenResolve(instance(removedEvent));

    await handler.execute(command);

    verify(
      eventRepository.remove(instance(removedEvent))
    ).once();
    verify(eventRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
  });

  it('testEventNotFound', async () => {
    when(eventRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(EventNotFoundException);
      expect(e.message).toBe('calendar.errors.event_not_found');
      verify(eventRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
      verify(eventRepository.remove(anything())).never();
    }
  });
});
