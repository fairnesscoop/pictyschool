import { mock, instance } from 'ts-mockito';
import { Classroom } from './Classroom.entity';
import { Shooting } from './Shooting.entity';

describe('Classroom', () => {
  it('testGetters', () => {
    const shooting = mock(Shooting);
    const classroom = new Classroom(
      'CE1',
      instance(shooting)
    );
    expect(classroom.getId()).toBeUndefined();
    expect(classroom.getName()).toBe('CE1');
    expect(classroom.getShooting()).toBe(instance(shooting));
  });
});
