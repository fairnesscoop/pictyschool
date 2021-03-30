import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { IsSchoolAlreadyExist } from 'src/Domain/School/Specification/IsSchoolAlreadyExist';
import { School } from 'src/Domain/School/School.entity';
import { CreateSchoolCommandHandler } from 'src/Application/School/Command/CreateSchoolCommandHandler';
import { CreateSchoolCommand } from 'src/Application/School/Command/CreateSchoolCommand';
import { SchoolAlreadyExistException } from 'src/Domain/School/Exception/SchoolAlreadyExistException';
import { Status, Type } from 'src/Domain/School/AbstractSchool';

describe('CreateSchoolCommandHandler', () => {
  let schoolRepository: SchoolRepository;
  let isSchoolAlreadyExist: IsSchoolAlreadyExist;
  let createdSchool: School;
  let handler: CreateSchoolCommandHandler;

  const command = new CreateSchoolCommand(
    'LM120I',
    'Belliard',
    '127 Rue Belliard',
    '75018',
    'Paris',
    Status.PRIVATE,
    Type.ELEMENTARY,
    '010101010101',
    200,
    10,
    'Observation',
    '12/12/2020',
  );

  beforeEach(() => {
    schoolRepository = mock(SchoolRepository);
    isSchoolAlreadyExist = mock(IsSchoolAlreadyExist);
    createdSchool = mock(School);

    handler = new CreateSchoolCommandHandler(
      instance(schoolRepository),
      instance(isSchoolAlreadyExist)
    );
  });

  it('testSchoolCreatedSuccessfully', async () => {
    when(isSchoolAlreadyExist.isSatisfiedBy('LM120I')).thenResolve(false);
    when(createdSchool.getId()).thenReturn(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );
    when(
      schoolRepository.save(
        deepEqual(
          new School(
            'LM120I',
            'Belliard',
            '127 Rue Belliard',
            '75018',
            'Paris',
            Status.PRIVATE,
            Type.ELEMENTARY,
            '010101010101',
            200,
            10,
            'Observation',
            '12/12/2020'
          )
        )
      )
    ).thenResolve(instance(createdSchool));

    expect(await handler.execute(command)).toBe(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );

    verify(isSchoolAlreadyExist.isSatisfiedBy('LM120I')).once();
    verify(
      schoolRepository.save(
        deepEqual(
          new School(
            'LM120I',
            'Belliard',
            '127 Rue Belliard',
            '75018',
            'Paris',
            Status.PRIVATE,
            Type.ELEMENTARY,
            '010101010101',
            200,
            10,
            'Observation',
            '12/12/2020'
          )
        )
      )
    ).once();
    verify(createdSchool.getId()).once();
  });

  it('testSchoolAlreadyExist', async () => {
    when(isSchoolAlreadyExist.isSatisfiedBy('LM120I')).thenResolve(true);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolAlreadyExistException);
      expect(e.message).toBe('schools.errors.already_exist');
      verify(isSchoolAlreadyExist.isSatisfiedBy('LM120I')).once();
      verify(schoolRepository.save(anything())).never();
      verify(createdSchool.getId()).never();
    }
  });
});
