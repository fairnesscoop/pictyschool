import { mock, instance, when, verify, anything } from 'ts-mockito';
import { UpdateSchoolCommandHandler } from './UpdateSchoolCommandHandler';
import { UpdateSchoolCommand } from './UpdateSchoolCommand';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { IsSchoolAlreadyExist } from 'src/Domain/School/Specification/IsSchoolAlreadyExist';
import { Civility, School } from 'src/Domain/School/School.entity';
import { SchoolAlreadyExistException } from 'src/Domain/School/Exception/SchoolAlreadyExistException';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { SchoolTypeRepository } from 'src/Infrastructure/School/Repository/SchoolTypeRepository';
import { SchoolTypeNotFoundException } from 'src/Domain/School/Exception/SchoolTypeNotFoundException';
import { SchoolType } from 'src/Domain/School/SchoolType.entity';

describe('UpdateSchoolCommandHandler', () => {
  let schoolRepository: SchoolRepository;
  let schoolTypeRepository: SchoolTypeRepository;
  let isSchoolAlreadyExist: IsSchoolAlreadyExist;

  let handler: UpdateSchoolCommandHandler;

  const school = mock(School);
  const schoolType = mock(SchoolType);
  const command = new UpdateSchoolCommand(
    '8a9df044-94a7-4e6c-abd1-ecdd69d788d5',
    'LM120I',
    'Belliard',
    '127 Rue Belliard',
    '75018',
    'Paris',
    'df8910f9-ac0a-412b-b9a8-dbf299340abc',
    '010101010101',
    'Chaullet',
    Civility.MR,
    'chaullet@mail.com',
    200,
    10,
    'Observation',
    '12/12/2020',
  );

  beforeEach(() => {
    schoolRepository = mock(SchoolRepository);
    schoolTypeRepository = mock(SchoolTypeRepository);
    isSchoolAlreadyExist = mock(IsSchoolAlreadyExist);
    handler = new UpdateSchoolCommandHandler(
      instance(schoolRepository),
      instance(schoolTypeRepository),
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
      verify(
        schoolTypeRepository.findOneById('df8910f9-ac0a-412b-b9a8-dbf299340abc')
      ).never();
      verify(isSchoolAlreadyExist.isSatisfiedBy(anything())).never();
      verify(schoolRepository.save(anything())).never();
      verify(
        school.update(anything(), anything(), anything(), anything(), anything(), anything())
      ).never();
    }
  });

  it('testSchoolAlreadyExist', async () => {
    when(school.getReference()).thenReturn('abc');
    when(
      schoolRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(instance(school));
    when(
      schoolTypeRepository.findOneById('df8910f9-ac0a-412b-b9a8-dbf299340abc')
    ).thenResolve(instance(schoolType));
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
        school.update(anything(), anything(), anything(), anything(), anything(), anything())
      ).never();
      verify(schoolRepository.save(anything())).never();
    }
  });

  it('testSchoolTypeNotFound', async () => {
    when(
      schoolRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(instance(school));
    when(
      schoolTypeRepository.findOneById('df8910f9-ac0a-412b-b9a8-dbf299340abc')
    ).thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolTypeNotFoundException);
      expect(e.message).toBe('schools.types.errors.not_found');
      verify(
        schoolRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
      ).once();
      verify(
        schoolTypeRepository.findOneById('df8910f9-ac0a-412b-b9a8-dbf299340abc')
      ).once();
      verify(isSchoolAlreadyExist.isSatisfiedBy(anything())).never();
      verify(schoolRepository.save(anything())).never();
      verify(
        school.update(anything(), anything(), anything(), anything(), anything())
      ).never();
    }
  });

  it('testSuccessfullyUpdated', async () => {
    when(school.getId()).thenReturn('8a9df044-94a7-4e6c-abd1-ecdd69d788d5');
    when(school.getReference()).thenReturn('LM120I');
    when(
      schoolRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(instance(school));
    when(
      schoolTypeRepository.findOneById('df8910f9-ac0a-412b-b9a8-dbf299340abc')
    ).thenResolve(instance(schoolType));

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
        '010101010101',
        'Chaullet',
        Civility.MR,
        'chaullet@mail.com',
        200,
        10,
        'Observation',
        '12/12/2020',
        instance(schoolType)
      )
    ).calledBefore(schoolRepository.save(instance(school)));
    verify(schoolRepository.save(instance(school))).once();
  });
});
