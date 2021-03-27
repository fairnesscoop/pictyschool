import { mock, instance, when, verify } from 'ts-mockito';
import { GetSchoolsQueryHandler } from 'src/Application/School/Query/GetSchoolsQueryHandler';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { GetSchoolsQuery } from 'src/Application/School/Query/GetSchoolsQuery';
import { School } from 'src/Domain/School/School.entity';
import { SchoolView } from 'src/Application/School/View/SchoolView';
import { Pagination } from 'src/Application/Common/Pagination';
import { SchoolType } from 'src/Domain/School/SchoolType.entity';
import { SchoolTypeView } from '../View/SchoolTypeView';
import { UserRole } from 'src/Domain/User/User.entity';

describe('GetSchoolsQueryHandler', () => {
  it('testGetSchoolsWithPhotographerRole', async () => {
    const schoolRepository = mock(SchoolRepository);

    const schoolType = mock(SchoolType);
    when(schoolType.getId()).thenReturn('ad7e727c-3066-42bf-982b-7219d26aeabb');
    when(schoolType.getName()).thenReturn('élementaire');

    const school1 = mock(School);
    when(school1.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(school1.getName()).thenReturn('Ecole élementaire Belliard');
    when(school1.getReference()).thenReturn('xLKJSs');
    when(school1.getAddress()).thenReturn('127 Rue Belliard');
    when(school1.getCity()).thenReturn('Paris');
    when(school1.getZipCode()).thenReturn('75010');
    when(school1.getSchoolType()).thenReturn(instance(schoolType));

    const school2 = mock(School);
    when(school2.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(school2.getName()).thenReturn('Ecole Primaire les Landes');
    when(school2.getReference()).thenReturn('abcDes');
    when(school2.getAddress()).thenReturn('12 Rue des Lampes');
    when(school2.getCity()).thenReturn('Paris');
    when(school2.getZipCode()).thenReturn('75018');

    when(schoolRepository.findSchools(1, null)).thenResolve([
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
          null
        ),
        new SchoolView(
          'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
          'Ecole élementaire Belliard',
          'xLKJSs',
          '127 Rue Belliard',
          'Paris',
          '75010',
          new SchoolTypeView('ad7e727c-3066-42bf-982b-7219d26aeabb', 'élementaire')
        )
      ],
      2
    );

    expect(
      await queryHandler.execute(
        new GetSchoolsQuery(1, '2eefa0ec-484b-4c13-ad8f-e7dbce14be64', UserRole.PHOTOGRAPHER)
      )).toMatchObject(expectedResult);
    verify(schoolRepository.findSchools(1, null)).once();
  });

  it('testGetSchoolsWithDirectorRole', async () => {
    const schoolRepository = mock(SchoolRepository);

    const school3 = mock(School);
    when(school3.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(school3.getName()).thenReturn('Ecole élementaire Belliard');
    when(school3.getReference()).thenReturn('xLKJSs');
    when(school3.getAddress()).thenReturn('127 Rue Belliard');
    when(school3.getCity()).thenReturn('Paris');
    when(school3.getZipCode()).thenReturn('75010');

    when(schoolRepository.findSchools(1, '2eefa0ec-484b-4c13-ad8f-e7dbce14be64')).thenResolve([
      [instance(school3)],
      1
    ]);

    const queryHandler = new GetSchoolsQueryHandler(instance(schoolRepository));
    const expectedResult = new Pagination<SchoolView>(
      [
        new SchoolView(
          'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
          'Ecole élementaire Belliard',
          'xLKJSs',
          '127 Rue Belliard',
          'Paris',
          '75010',
          null
        )
      ],
      1
    );

    expect(
      await queryHandler.execute(
        new GetSchoolsQuery(1, '2eefa0ec-484b-4c13-ad8f-e7dbce14be64', UserRole.DIRECTOR)
      )).toMatchObject(expectedResult);
    verify(schoolRepository.findSchools(1, '2eefa0ec-484b-4c13-ad8f-e7dbce14be64')).once();
  });
});
