import { mock, instance } from 'ts-mockito';
import { School } from './School.entity';
import { Photographer } from '../User/Photographer.entity';
import { SchoolType } from './SchoolType.entity';

describe('School', () => {
  const photographer = mock(Photographer);
  const schoolType = mock(SchoolType);

  it('testGetters', () => {
    const school = new School(
      'LM120I',
      'Belliard',
      '127 Rue Belliard',
      '75018',
      'Paris',
      instance(photographer),
      instance(schoolType)
    );
    expect(school.getId()).toBeUndefined();
    expect(school.getName()).toBe('Belliard');
    expect(school.getReference()).toBe('LM120I');
    expect(school.getCity()).toBe('Paris');
    expect(school.getZipCode()).toBe('75018');
    expect(school.getAddress()).toBe('127 Rue Belliard');
    expect(school.getPhotographer()).toBe(instance(photographer));
    expect(school.getSchoolType()).toBe(instance(schoolType));
    expect(school.getCreatedAt()).toBeUndefined();
  });

  it('testUpdate', () => {
    const schoolType2 = mock(SchoolType);
    const school = new School(
      'LM120I',
      'Belliard',
      '127 Rue Belliard',
      '75018',
      'Paris',
      instance(photographer),
      instance(schoolType)
    );
    expect(school.getId()).toBeUndefined();
    expect(school.getName()).toBe('Belliard');
    expect(school.getReference()).toBe('LM120I');
    expect(school.getCity()).toBe('Paris');
    expect(school.getZipCode()).toBe('75018');
    expect(school.getAddress()).toBe('127 Rue Belliard');
    expect(school.getPhotographer()).toBe(instance(photographer));
    expect(school.getSchoolType()).toBe(instance(schoolType));
    expect(school.getCreatedAt()).toBeUndefined();

    school.update('ref', 'name', 'address', 'zipCode', 'city', instance(schoolType2));

    expect(school.getName()).toBe('name');
    expect(school.getReference()).toBe('ref');
    expect(school.getCity()).toBe('city');
    expect(school.getZipCode()).toBe('zipCode');
    expect(school.getAddress()).toBe('address');
    expect(school.getSchoolType()).toBe(instance(schoolType2));
  });
});
