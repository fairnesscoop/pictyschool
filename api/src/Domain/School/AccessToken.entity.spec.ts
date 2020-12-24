import { mock, instance } from 'ts-mockito';
import { AccessToken } from './AccessToken.entity';
import { Photo } from './Photo.entity';

describe('AccessToken', () => {
  it('testGetters', () => {
    const date = new Date('2020-09-29');
    const photo = mock(Photo);
    const accesstoken = new AccessToken('token', date, instance(photo));

    expect(accesstoken.getId()).toBeUndefined();
    expect(accesstoken.getPhoto()).toBe(instance(photo));
    expect(accesstoken.getToken()).toBe('token');
    expect(accesstoken.getExpiredAt()).toBe(date);
  });
});
