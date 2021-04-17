import { mock, instance, when, verify, anything } from 'ts-mockito';
import { UpdateSchoolCommandHandler } from './UpdateSchoolCommandHandler';
import { UpdateSchoolCommand } from './UpdateSchoolCommand';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { IsSchoolAlreadyExist } from 'src/Domain/School/Specification/IsSchoolAlreadyExist';
import { School } from 'src/Domain/School/School.entity';
import { SchoolAlreadyExistException } from 'src/Domain/School/Exception/SchoolAlreadyExistException';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { Status, Type } from 'src/Domain/School/AbstractSchool';

describe('UpdateSchoolCommandHandler', () => {
  let schoolRepository: SchoolRepository;
  let isSchoolAlreadyExist: IsSchoolAlreadyExist;

  let handler: UpdateSchoolCommandHandler;

  const school = mock(School);
  const command = new UpdateSchoolCommand(
    '8a9df044-94a7-4e6c-abd1-ecdd69d788d5',
    'LM120I',
    'Belliard',
    '127 Rue Belliard',
    '75018',
    'Paris',
    Status.PRIVATE,
    Type.ELEMENTARY,
    'mathieu@fairness.coop',
    '010101010101',
    200,
    10,
    'Observation'
  );

  beforeEach(() => {
    schoolRepository = mock(SchoolRepository);
    isSchoolAlreadyExist = mock(IsSchoolAlreadyExist);
    handler = new UpdateSchoolCommandHandler(
      instance(schoolRepository),
      instance(isSchoolAlreadyExist)
    );
  });

  it('testSchoolNotFound', async () => {
    when(
      schoolRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolNotFoundException);
      expect(e.message).toBe('schools.errors.not_found');
      verify(
        schoolRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
      ).once();
      verify(isSchoolAlreadyExist.isSatisfiedBy(anything())).never();
      verify(schoolRepository.save(anything())).never();
      verify(
        school.update(anything(), anything(), anything(), anything(), anything(), anything(), anything(), anything())
      ).never();
    }
  });

  it('testSchoolAlreadyExist', async () => {
    when(school.getReference()).thenReturn('abc');
    when(
      schoolRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(instance(school));
    when(
      isSchoolAlreadyExist.isSatisfiedBy('LM120I')
    ).thenResolve(true);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolAlreadyExistException);
      expect(e.message).toBe('schools.errors.already_exist');
      verify(
        isSchoolAlreadyExist.isSatisfiedBy('LM120I')
      ).once();
      verify(
        school.update(anything(), anything(), anything(), anything(), anything(), anything(), anything(), anything())
      ).never();
      verify(schoolRepository.save(anything())).never();
    }
  });

  it('testSuccessfullyUpdated', async () => {
    when(school.getId()).thenReturn('8a9df044-94a7-4e6c-abd1-ecdd69d788d5');
    when(school.getReference()).thenReturn('LM120I');
    when(
      schoolRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(instance(school));

    expect(await handler.execute(command)).toBe(
      '8a9df044-94a7-4e6c-abd1-ecdd69d788d5'
    );

    verify(isSchoolAlreadyExist.isSatisfiedBy(anything())).never();
    verify(
      school.update(
        'LM120I',
        'Belliard',
        '127 Rue Belliard',
        '75018',
        'Paris',
        Status.PRIVATE,
        Type.ELEMENTARY,
        'mathieu@fairness.coop',
        '010101010101',
        200,
        10,
        'Observation'
      )
    ).calledBefore(schoolRepository.save(instance(school)));
    verify(schoolRepository.save(instance(school))).once();
  });
});
