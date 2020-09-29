import { mock, instance } from 'ts-mockito';
import { Photo, PhotoType } from './Photo.entity';
import { School } from './School.entity';

describe('Photo', () => {
  it('testGetters', () => {
    const school = mock(School);
    const photo = new Photo(
      PhotoType.UNIT,
      '0031',
      'path/to/image.jpg',
      instance(school)
    );
    expect(photo.getId()).toBe(undefined);
    expect(photo.getName()).toBe('0031');
    expect(photo.getPath()).toBe('path/to/image.jpg');
    expect(photo.getType()).toBe(PhotoType.UNIT);
    expect(photo.getSchool()).toBe(instance(school));
    expect(photo.getCreatedAt()).toBe(undefined);
    expect(photo.getAccessToken()).toBe(undefined);
  });
});
