import { mock, instance, when, verify } from 'ts-mockito';
import { GetSchoolsQueryHandler } from 'src/Application/School/Query/GetSchoolsQueryHandler';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { GetSchoolsQuery } from 'src/Application/School/Query/GetSchoolsQuery';
import { School } from 'src/Domain/School/School.entity';
import { SchoolView } from 'src/Application/School/View/SchoolView';
import { Pagination } from 'src/Application/Common/Pagination';
import { Status, Type } from 'src/Domain/School/AbstractSchool';

describe('GetSchoolsQueryHandler', () => {
  it('testGetSchools', async () => {
    const schoolRepository = mock(SchoolRepository);

    const school1 = mock(School);
    when(school1.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(school1.getName()).thenReturn('Ecole élementaire Belliard');
    when(school1.getReference()).thenReturn('xLKJSs');
    when(school1.getAddress()).thenReturn('127 Rue Belliard');
    when(school1.getCity()).thenReturn('Paris');
    when(school1.getZipCode()).thenReturn('75010');
    when(school1.getType()).thenReturn(Type.ELEMENTARY);
    when(school1.getStatus()).thenReturn(Status.PUBLIC);

    const school2 = mock(School);
    when(school2.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(school2.getName()).thenReturn('Ecole Primaire les Landes');
    when(school2.getReference()).thenReturn('abcDes');
    when(school2.getAddress()).thenReturn('12 Rue des Lampes');
    when(school2.getCity()).thenReturn('Paris');
    when(school2.getZipCode()).thenReturn('75018');
    when(school2.getType()).thenReturn(Type.ELEMENTARY);
    when(school2.getStatus()).thenReturn(Status.PRIVATE);

    when(schoolRepository.findSchools(1)).thenResolve([
      [instance(school2), instance(school1)],
      2
    ]);

    const queryHandler = new GetSchoolsQueryHandler(instance(schoolRepository));
    const expectedResult = new Pagination<SchoolView>(
      [
        new SchoolView(
          'd54f15d6-1a1d-47e8-8672-9f46018f9960',
          'Ecole Primaire les Landes',
          'abcDes',
          '12 Rue des Lampes',
          'Paris',
          '75018',
          Status.PRIVATE,
          Type.ELEMENTARY
        ),
        new SchoolView(
          'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
          'Ecole élementaire Belliard',
          'xLKJSs',
          '127 Rue Belliard',
          'Paris',
          '75010',
          Status.PUBLIC,
          Type.ELEMENTARY
        )
      ],
      2
    );

    expect(
      await queryHandler.execute(new GetSchoolsQuery(1))).toMatchObject(expectedResult);
    verify(schoolRepository.findSchools(1)).once();
  });
});
