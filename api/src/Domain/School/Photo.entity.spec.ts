import { mock, instance } from 'ts-mockito';
import { Photo, PhotoType } from './Photo.entity';
import { Classroom } from './Classroom.entity';

describe('Photo', () => {
  it('testGetters', () => {
    const classroom = mock(Classroom);
    const photo = new Photo(
      PhotoType.UNIT,
      '0031',
      'path/to/image.jpg',
      'asOIjs',
      instance(classroom)
    );
    expect(photo.getId()).toBeUndefined();
    expect(photo.getName()).toBe('0031');
    expect(photo.getPath()).toBe('path/to/image.jpg');
    expect(photo.getType()).toBe(PhotoType.UNIT);
    expect(photo.getClassroom()).toBe(instance(classroom));
    expect(photo.getCreatedAt()).toBeUndefined();
    expect(photo.getToken()).toBe('asOIjs');
  });
});
