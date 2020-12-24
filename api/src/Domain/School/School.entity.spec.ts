import { mock, instance } from 'ts-mockito';
import { School } from './School.entity';
import { Photographer } from '../User/Photographer.entity';

describe('School', () => {
  it('testGetters', () => {
    const photographer = mock(Photographer);
    const school = new School(
      'LM120I',
      'Ecole élémentaire Belliard',
      '75018',
      'Paris',
      instance(photographer)
    );
    expect(school.getId()).toBeUndefined();
    expect(school.getName()).toBe('Ecole élémentaire Belliard');
    expect(school.getReference()).toBe('LM120I');
    expect(school.getCity()).toBe('Paris');
    expect(school.getZipCode()).toBe('75018');
    expect(school.getPhotographer()).toBe(instance(photographer));
    expect(school.getCreatedAt()).toBeUndefined();
  });
});
