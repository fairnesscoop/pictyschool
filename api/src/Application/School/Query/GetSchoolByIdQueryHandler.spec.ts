import { mock, instance, when, verify } from 'ts-mockito';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { School } from 'src/Domain/School/School.entity';
import { SchoolView } from 'src/Application/School/View/SchoolView';
import { GetSchoolByIdQueryHandler } from './GetSchoolByIdQueryHandler';
import { GetSchoolByIdQuery } from './GetSchoolByIdQuery';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { SchoolType } from 'src/Domain/School/SchoolType.entity';
import { SchoolTypeView } from '../View/SchoolTypeView';

describe('GetSchoolByIdQueryHandler', () => {
  const query = new GetSchoolByIdQuery('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');

  it('testGetSchool', async () => {
    const schoolRepository = mock(SchoolRepository);
    const queryHandler = new GetSchoolByIdQueryHandler(instance(schoolRepository));
    const expectedResult = new SchoolView(
      'd54f15d6-1a1d-47e8-8672-9f46018f9960',
      'Ecole Primaire les Landes',
      'abcDes',
      '12 Rue des Lampes',
      'Paris',
      '75018',
      new SchoolTypeView('ad7e727c-3066-42bf-982b-7219d26aeabb', 'élémentaire')
    );

    const schoolType = mock(SchoolType);
    when(schoolType.getId()).thenReturn('ad7e727c-3066-42bf-982b-7219d26aeabb');
    when(schoolType.getName()).thenReturn('élémentaire');

    const school = mock(School);
    when(school.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(school.getName()).thenReturn('Ecole Primaire les Landes');
    when(school.getReference()).thenReturn('abcDes');
    when(school.getAddress()).thenReturn('12 Rue des Lampes');
    when(school.getCity()).thenReturn('Paris');
    when(school.getZipCode()).thenReturn('75018');
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
    const expectedResult = new SchoolView(
      'd54f15d6-1a1d-47e8-8672-9f46018f9960',
      'Ecole Primaire les Landes',
      'abcDes',
      '12 Rue des Lampes',
      'Paris',
      '75018',
      null
    );

    const school = mock(School);
    when(school.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(school.getName()).thenReturn('Ecole Primaire les Landes');
    when(school.getReference()).thenReturn('abcDes');
    when(school.getAddress()).thenReturn('12 Rue des Lampes');
    when(school.getCity()).thenReturn('Paris');
    when(school.getZipCode()).thenReturn('75018');
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
