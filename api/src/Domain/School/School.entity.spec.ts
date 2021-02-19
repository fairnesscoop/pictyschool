import { mock, instance } from 'ts-mockito';
import { Civility, School } from './School.entity';
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
      '010101010101',
      'Chaullet',
      Civility.MR,
      'chaullet@mail.com',
      200,
      10,
      'Observation',
      '10/10/2020',
      instance(schoolType)
    );
    expect(school.getId()).toBeUndefined();
    expect(school.getName()).toBe('Belliard');
    expect(school.getReference()).toBe('LM120I');
    expect(school.getCity()).toBe('Paris');
    expect(school.getZipCode()).toBe('75018');
    expect(school.getAddress()).toBe('127 Rue Belliard');
    expect(school.getDirector()).toBe('Chaullet');
    expect(school.getDirectorCivility()).toBe(Civility.MR);
    expect(school.getEmail()).toBe('chaullet@mail.com');
    expect(school.getPhoneNumber()).toBe('010101010101');
    expect(school.getObservation()).toBe('Observation');
    expect(school.getPdv()).toBe('10/10/2020');
    expect(school.getNumberOfClasses()).toBe(10);
    expect(school.getNumberOfStudents()).toBe(200);
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
      '010101010101',
      'Chaullet',
      Civility.MR,
      'chaullet@mail.com',
      200,
      10,
      'Observation',
      '10/10/2020',
      instance(schoolType)
    );
    school.update(
      'ref',
      'name',
      'address',
      'zipCode',
      'city',
      'phone',
      'director',
      Civility.MME,
      'email',
      1,
      1,
      'obs',
      '11/10/2020',
      instance(schoolType2)
    );

    expect(school.getName()).toBe('name');
    expect(school.getReference()).toBe('ref');
    expect(school.getCity()).toBe('city');
    expect(school.getZipCode()).toBe('zipCode');
    expect(school.getAddress()).toBe('address');
    expect(school.getDirector()).toBe('director');
    expect(school.getDirectorCivility()).toBe(Civility.MME);
    expect(school.getEmail()).toBe('email');
    expect(school.getPhoneNumber()).toBe('phone');
    expect(school.getObservation()).toBe('obs');
    expect(school.getPdv()).toBe('11/10/2020');
    expect(school.getNumberOfClasses()).toBe(1);
    expect(school.getNumberOfStudents()).toBe(1);
    expect(school.getSchoolType()).toBe(instance(schoolType2));
  });
});
