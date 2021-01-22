import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { IsSchoolAlreadyExist } from 'src/Domain/School/Specification/IsSchoolAlreadyExist';
import { School } from 'src/Domain/School/School.entity';
import { CreateSchoolCommandHandler } from 'src/Application/School/Command/CreateSchoolCommandHandler';
import { CreateSchoolCommand } from 'src/Application/School/Command/CreateSchoolCommand';
import { SchoolAlreadyExistException } from 'src/Domain/School/Exception/SchoolAlreadyExistException';
import { Photographer } from 'src/Domain/User/Photographer.entity';
import { SchoolTypeRepository } from 'src/Infrastructure/School/Repository/SchoolTypeRepository';
import { SchoolType } from 'src/Domain/School/SchoolType.entity';
import { SchoolTypeNotFoundException } from 'src/Domain/School/Exception/SchoolTypeNotFoundException';

describe('CreateSchoolCommandHandler', () => {
  let schoolRepository: SchoolRepository;
  let schoolTypeRepository: SchoolTypeRepository;
  let isSchoolAlreadyExist: IsSchoolAlreadyExist;
  let createdSchool: School;
  let handler: CreateSchoolCommandHandler;

  const photographer = mock(Photographer);
  const schoolType = mock(SchoolType);
  const command = new CreateSchoolCommand(
    'xLKJSs',
    'Ecole élementaire Belliard',
    '127 Rue Belliard',
    '75010',
    'Paris',
    'df8910f9-ac0a-412b-b9a8-dbf299340abc',
    instance(photographer)
  );

  beforeEach(() => {
    schoolRepository = mock(SchoolRepository);
    schoolTypeRepository = mock(SchoolTypeRepository);
    isSchoolAlreadyExist = mock(IsSchoolAlreadyExist);
    createdSchool = mock(School);

    handler = new CreateSchoolCommandHandler(
      instance(schoolRepository),
      instance(schoolTypeRepository),
      instance(isSchoolAlreadyExist)
    );
  });

  it('testSchoolCreatedSuccessfully', async () => {
    when(schoolTypeRepository.findOneById('df8910f9-ac0a-412b-b9a8-dbf299340abc'))
      .thenResolve(instance(schoolType));
    when(isSchoolAlreadyExist.isSatisfiedBy('xLKJSs')).thenResolve(false);
    when(createdSchool.getId()).thenReturn(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );
    when(
      schoolRepository.save(
        deepEqual(
          new School(
            'xLKJSs',
            'Ecole élementaire Belliard',
            '127 Rue Belliard',
            '75010',
            'Paris',
            instance(photographer),
            instance(schoolType)
          )
        )
      )
    ).thenResolve(instance(createdSchool));

    expect(await handler.execute(command)).toBe(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );

    verify(isSchoolAlreadyExist.isSatisfiedBy('xLKJSs')).once();
    verify(schoolTypeRepository.findOneById('df8910f9-ac0a-412b-b9a8-dbf299340abc')).once();
    verify(
      schoolRepository.save(
        deepEqual(
          new School(
            'xLKJSs',
            'Ecole élementaire Belliard',
            '127 Rue Belliard',
            '75010',
            'Paris',
            instance(photographer),
            instance(schoolType)
          )
        )
      )
    ).once();
    verify(createdSchool.getId()).once();
  });

  it('testSchoolTypeNotFound', async () => {
    when(schoolTypeRepository.findOneById('df8910f9-ac0a-412b-b9a8-dbf299340abc'))
      .thenResolve(null);
    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolTypeNotFoundException);
      expect(e.message).toBe('schools.types.errors.not_found');
      verify(schoolTypeRepository.findOneById('df8910f9-ac0a-412b-b9a8-dbf299340abc')).once();
      verify(isSchoolAlreadyExist.isSatisfiedBy('xLKJSs')).never();
      verify(schoolRepository.save(anything())).never();
      verify(createdSchool.getId()).never();
    }
  });

  it('testSchoolAlreadyExist', async () => {
    when(schoolTypeRepository.findOneById('df8910f9-ac0a-412b-b9a8-dbf299340abc'))
      .thenResolve(instance(schoolType));
    when(isSchoolAlreadyExist.isSatisfiedBy('xLKJSs')).thenResolve(true);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolAlreadyExistException);
      expect(e.message).toBe('schools.errors.already_exist');
      verify(isSchoolAlreadyExist.isSatisfiedBy('xLKJSs')).once();
      verify(schoolRepository.save(anything())).never();
      verify(createdSchool.getId()).never();
    }
  });
});
