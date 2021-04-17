import { mock, instance } from 'ts-mockito';
import { Photo, PhotoType } from './Photo.entity';
import { Shooting } from './Shooting.entity';

describe('Photo', () => {
  it('testGetters', () => {
    const shooting = mock(Shooting);
    const photo = new Photo(
      PhotoType.UNIT,
      '0031',
      'path/to/image.jpg',
      'asOIjs',
      instance(shooting)
    );
    expect(photo.getId()).toBeUndefined();
    expect(photo.getName()).toBe('0031');
    expect(photo.getPath()).toBe('path/to/image.jpg');
    expect(photo.getType()).toBe(PhotoType.UNIT);
    expect(photo.getShooting()).toBe(instance(shooting));
    expect(photo.getCreatedAt()).toBeUndefined();
    expect(photo.getToken()).toBe('asOIjs');
  });
});
