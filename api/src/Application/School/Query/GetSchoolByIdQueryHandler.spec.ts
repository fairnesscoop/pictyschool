import { mock, instance, when, verify } from 'ts-mockito';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { School } from 'src/Domain/School/School.entity';
import { GetSchoolByIdQueryHandler } from './GetSchoolByIdQueryHandler';
import { GetSchoolByIdQuery } from './GetSchoolByIdQuery';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { SchoolType } from 'src/Domain/School/SchoolType.entity';
import { SchoolTypeView } from '../View/SchoolTypeView';
import { SchoolDetailView } from '../View/SchoolDetailView';

describe('GetSchoolByIdQueryHandler', () => {
  const query = new GetSchoolByIdQuery('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');

  it('testGetSchool', async () => {
    const schoolRepository = mock(SchoolRepository);
    const queryHandler = new GetSchoolByIdQueryHandler(instance(schoolRepository));
    const expectedResult = new SchoolDetailView(
      'd54f15d6-1a1d-47e8-8672-9f46018f9960',
      'Belliard',
      'LM120I',
      '127 Rue Belliard',
      'Paris',
      '75018',
      '010101010101',
      10,
      200,
      '12/12/2020',
      'Observation',
      new SchoolTypeView('ad7e727c-3066-42bf-982b-7219d26aeabb', 'élémentaire')
    );

    const schoolType = mock(SchoolType);
    when(schoolType.getId()).thenReturn('ad7e727c-3066-42bf-982b-7219d26aeabb');
    when(schoolType.getName()).thenReturn('élémentaire');

    const school = mock(School);
    when(school.getName()).thenReturn('Belliard');
    when(school.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(school.getReference()).thenReturn('LM120I');
    when(school.getAddress()).thenReturn('127 Rue Belliard');
    when(school.getCity()).thenReturn('Paris');
    when(school.getZipCode()).thenReturn('75018');
    when(school.getPhoneNumber()).thenReturn('010101010101');
    when(school.getNumberOfClasses()).thenReturn(10);
    when(school.getNumberOfStudents()).thenReturn(200);
    when(school.getPdv()).thenReturn('12/12/2020');
    when(school.getObservation()).thenReturn('Observation');
    when(school.getSchoolType()).thenReturn(instance(schoolType));
    when(
      schoolRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(school));

    expect(await queryHandler.execute(query)).toMatchObject(expectedResult);

    verify(
      schoolRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
  });

  it('testGetSchoolWithoutSchoolType', async () => {
    const schoolRepository = mock(SchoolRepository);
    const queryHandler = new GetSchoolByIdQueryHandler(instance(schoolRepository));
    const expectedResult = new SchoolDetailView(
      'd54f15d6-1a1d-47e8-8672-9f46018f9960',
      'Belliard',
      'LM120I',
      '127 Rue Belliard',
      'Paris',
      '75018',
      '010101010101',
      10,
      200,
      '12/12/2020',
      'Observation',
      null
    );

    const school = mock(School);
    when(school.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(school.getName()).thenReturn('Belliard');
    when(school.getReference()).thenReturn('LM120I');
    when(school.getAddress()).thenReturn('127 Rue Belliard');
    when(school.getCity()).thenReturn('Paris');
    when(school.getZipCode()).thenReturn('75018');
    when(school.getPhoneNumber()).thenReturn('010101010101');
    when(school.getNumberOfClasses()).thenReturn(10);
    when(school.getNumberOfStudents()).thenReturn(200);
    when(school.getPdv()).thenReturn('12/12/2020');
    when(school.getObservation()).thenReturn('Observation');
    when(school.getSchoolType()).thenReturn(null);
    when(
      schoolRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(school));

    expect(await queryHandler.execute(query)).toMatchObject(expectedResult);

    verify(
      schoolRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
  });

  it('testGetSchoolNotFound', async () => {
    const schoolRepository = mock(SchoolRepository);
    const queryHandler = new GetSchoolByIdQueryHandler(instance(schoolRepository));
    when(
      schoolRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(null);

    try {
      expect(await queryHandler.execute(query)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolNotFoundException);
      expect(e.message).toBe('schools.errors.not_found');
      verify(
        schoolRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
    }
  });
});
