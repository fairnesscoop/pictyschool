import { Event } from 'src/Domain/Calendar/Event.entity';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { School } from 'src/Domain/School/School.entity';
import { UserNotFoundException } from 'src/Domain/User/Exception/UserNotFoundException';
import { User } from 'src/Domain/User/User.entity';
import { EventRepository } from 'src/Infrastructure/Calendar/Repository/EventRepository';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import {
  mock,
  instance,
  when,
  verify,
  anything,
  deepEqual
} from 'ts-mockito';
import { CreateEventCommand } from './CreateEventCommand';
import { CreateEventCommandHandler } from './CreateEventCommandHandler';

describe('CreateEventCommandHandler', () => {
  let schoolRepository: SchoolRepository;
  let userRepository: UserRepository;
  let eventRepository: EventRepository;
  let handler: CreateEventCommandHandler;

  const user = mock(User);
  const school = mock(School);
  const command = new CreateEventCommand(
    new Date('2020-10-19'),
    'e3fc9666-2932-4dc1-b2b9-d904388293fb',
    '50e624ef-3609-4053-a437-f74844a2d2de',
    'Prise de vue'
  );

  beforeEach(() => {
    schoolRepository = mock(SchoolRepository);
    userRepository = mock(UserRepository);
    eventRepository = mock(EventRepository);

    handler = new CreateEventCommandHandler(
      instance(schoolRepository),
      instance(eventRepository),
      instance(userRepository)
    );
  });

  it('testSchoolNotFound', async () => {
    when(
      userRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
    ).thenResolve(instance(user));
    when(
      schoolRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(null);
    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolNotFoundException);
      expect(e.message).toBe('schools.errors.not_found');
      verify(
        schoolRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
      ).once();
      verify(
        userRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
      ).once();
      verify(eventRepository.save(anything())).never();
    }
  });

  it('testUserNotFound', async () => {
    when(
      schoolRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(instance(school));
    when(
      userRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(UserNotFoundException);
      expect(e.message).toBe('users.errors.not_found');
      verify(
        schoolRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
      ).never();
      verify(
        userRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
      ).once();
      verify(eventRepository.save(anything())).never();
    }
  });

  it('testEventCreated', async () => {
    const event = mock(Event);
    when(
      schoolRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(instance(school));
    when(
      userRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
    ).thenResolve(instance(user));
    when(event.getId()).thenReturn('6d48fae8-d579-4ab7-9155-1978dd650f0e');
    when(
      eventRepository.save(
        deepEqual(
          new Event(
            new Date('2020-10-19'),
            instance(user),
            instance(school),
            'Prise de vue'
          )
        )
      )
    ).thenResolve(instance(event));

    expect(await handler.execute(command)).toBe('6d48fae8-d579-4ab7-9155-1978dd650f0e');
    verify(
      schoolRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).once();
    verify(
      userRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
    ).once();
    verify(eventRepository.save(
      deepEqual(
        new Event(
          new Date('2020-10-19'),
          instance(user),
          instance(school),
          'Prise de vue'
        )
      )
    )).once();
  });
});
