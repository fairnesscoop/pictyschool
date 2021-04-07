import { mock, instance } from 'ts-mockito';
import { School } from '../School/School.entity';
import { User } from '../User/User.entity';
import { Event } from './Event.entity';

describe('Event', () => {
  it('testGetters', () => {
    const user = mock(User);
    const school = mock(School);

    const event = new Event(
      new Date('2019-12-12T10:00:00.000Z'),
      new Date('2019-12-12T15:00:00.000Z'),
      instance(user),
      instance(school),
      'Prise de vue'
    );

    expect(event.getId()).toBeUndefined();
    expect(event.getFromDate()).toMatchObject(new Date('2019-12-12T10:00:00.000Z'));
    expect(event.getToDate()).toMatchObject(new Date('2019-12-12T15:00:00.000Z'));
    expect(event.getSchool()).toBe(instance(school));
    expect(event.getPhotographer()).toBe(instance(user));
    expect(event.getSummary()).toBe('Prise de vue');
  });
});
