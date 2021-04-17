import { mock, instance } from 'ts-mockito';
import { School } from '../School/School.entity';
import { User } from '../User/User.entity';
import { Event } from './Event.entity';

const user = mock(User);
const school = mock(School);

describe('Event', () => {
  it('testGetters', () => {
    const event = new Event(
      new Date('2019-12-12T10:00:00.000Z'),
      instance(user),
      instance(school),
      'Prise de vue'
    );

    expect(event.getId()).toBeUndefined();
    expect(event.getDate()).toMatchObject(new Date('2019-12-12T10:00:00.000Z'));
    expect(event.getSchool()).toBe(instance(school));
    expect(event.getPhotographer()).toBe(instance(user));
    expect(event.getSummary()).toBe('Prise de vue');
  });

  it('testUpdate', () => {
    const user2 = mock(User);
    const school2 = mock(School);

    const event = new Event(
      new Date('2019-12-12T10:00:00.000Z'),
      instance(user),
      instance(school),
      'Prise de vue'
    );
    event.update(
      new Date('2019-12-14T10:00:00.000Z'),
      instance(user2),
      instance(school2),
      'Ancienne prise de vue'
    );

    expect(event.getDate()).toMatchObject(new Date('2019-12-14T10:00:00.000Z'));
    expect(event.getSchool()).toBe(instance(school2));
    expect(event.getPhotographer()).toBe(instance(user2));
    expect(event.getSummary()).toBe('Ancienne prise de vue');
  });
});
