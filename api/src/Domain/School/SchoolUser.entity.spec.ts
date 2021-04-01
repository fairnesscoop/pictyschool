import { mock, instance } from 'ts-mockito';
import { SchoolUser } from './SchoolUser.entity';
import { School } from './School.entity';
import { User } from '../User/User.entity';

describe('SchoolUser', () => {
  it('testGetters', () => {
    const school = mock(School);
    const user = mock(User);
    const schooluser = new SchoolUser(
      instance(school),
      instance(user)
    );
    expect(schooluser.getId()).toBeUndefined();
    expect(schooluser.getUser()).toBe(instance(user));
    expect(schooluser.getSchool()).toBe(instance(school));
  });
});
