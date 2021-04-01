import { mock, instance, when, verify, anything } from 'ts-mockito';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { School } from 'src/Domain/School/School.entity';
import { GetSchoolByIdQueryHandler } from './GetSchoolByIdQueryHandler';
import { GetSchoolByIdQuery } from './GetSchoolByIdQuery';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { SchoolDetailView } from '../View/SchoolDetailView';
import { CanUserAccessToSchool } from 'src/Domain/User/Specification/CanUserAccessToSchool';
import { UserCantAccessToSchoolException } from 'src/Domain/User/Exception/UserCantAccessToSchoolException';
import { Status, Type } from 'src/Domain/School/AbstractSchool';

describe('GetSchoolByIdQueryHandler', () => {
  const query = new GetSchoolByIdQuery('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2', '551d848f-a1d5-4067-9a12-5f918b69d077');
  let schoolRepository: SchoolRepository;
  let canUserAccessToSchool: CanUserAccessToSchool;
  let queryHandler: GetSchoolByIdQueryHandler;
  let school: School;

  beforeEach(() => {
    school = mock(School);
    schoolRepository = mock(SchoolRepository);
    canUserAccessToSchool = mock(CanUserAccessToSchool);
    queryHandler = new GetSchoolByIdQueryHandler(instance(schoolRepository), instance(canUserAccessToSchool));
  });

  it('testGetSchool', async () => {
    const expectedResult = new SchoolDetailView(
      'd54f15d6-1a1d-47e8-8672-9f46018f9960',
      'Belliard',
      'LM120I',
      '127 Rue Belliard',
      'Paris',
      '75018',
      Status.PUBLIC,
      Type.ELEMENTARY,
      'mathieu@fairness.coop',
      '010101010101',
      10,
      200,
      '12/12/2020',
      'Observation'
    );

    when(school.getName()).thenReturn('Belliard');
    when(school.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(school.getReference()).thenReturn('LM120I');
    when(school.getAddress()).thenReturn('127 Rue Belliard');
    when(school.getCity()).thenReturn('Paris');
    when(school.getZipCode()).thenReturn('75018');
    when(school.getPhoneNumber()).thenReturn('010101010101');
    when(school.getEmail()).thenReturn('mathieu@fairness.coop');
    when(school.getNumberOfClasses()).thenReturn(10);
    when(school.getNumberOfStudents()).thenReturn(200);
    when(school.getPdv()).thenReturn('12/12/2020');
    when(school.getObservation()).thenReturn('Observation');
    when(school.getType()).thenReturn(Type.ELEMENTARY);
    when(school.getStatus()).thenReturn(Status.PUBLIC);
    when(
      schoolRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(school));
    when(
      canUserAccessToSchool.isSatisfiedBy(instance(school), '551d848f-a1d5-4067-9a12-5f918b69d077')
    ).thenResolve(true);
    expect(await queryHandler.execute(query)).toMatchObject(expectedResult);

    verify(
      schoolRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
    verify(
      canUserAccessToSchool.isSatisfiedBy(instance(school), '551d848f-a1d5-4067-9a12-5f918b69d077')
    ).once();
  });

  it('testGetSchoolNotFound', async () => {
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
      verify(canUserAccessToSchool.isSatisfiedBy(anything(), anything())).never();
    }
  });

  it('testUserCantAccessToSchool', async () => {
    when(
      schoolRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(school));
    when(
      canUserAccessToSchool.isSatisfiedBy(instance(school), '551d848f-a1d5-4067-9a12-5f918b69d077')
    ).thenResolve(false);

    try {
      expect(await queryHandler.execute(query)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(UserCantAccessToSchoolException);
      expect(e.message).toBe('users.errors.cant_access_to_school');
      verify(
        schoolRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
      verify(
        canUserAccessToSchool.isSatisfiedBy(instance(school), '551d848f-a1d5-4067-9a12-5f918b69d077')
      ).once();
    }
  });
});
