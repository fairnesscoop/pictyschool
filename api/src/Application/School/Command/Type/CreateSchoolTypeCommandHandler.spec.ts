import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { IsSchoolTypeAlreadyExist } from 'src/Domain/School/Specification/Type/IsSchoolTypeAlreadyExist';
import { SchoolTypeRepository } from 'src/Infrastructure/School/Repository/SchoolTypeRepository';
import { SchoolType } from 'src/Domain/School/SchoolType.entity';
import { CreateSchoolTypeCommandHandler } from './CreateSchoolTypeCommandHandler';
import { CreateSchoolTypeCommand } from './CreateSchoolTypeCommand';
import { SchoolTypeAlreadyExistException } from 'src/Domain/School/Exception/SchoolTypeAlreadyExistException';

describe('CreateSchoolTypeCommandHandler', () => {
  let schoolTypeRepository: SchoolTypeRepository;
  let isSchoolTypeAlreadyExist: IsSchoolTypeAlreadyExist;
  let createdSchoolType: SchoolType;
  let handler: CreateSchoolTypeCommandHandler;

  const command = new CreateSchoolTypeCommand(
    'Maternelle'
  );

  beforeEach(() => {
    schoolTypeRepository = mock(SchoolTypeRepository);
    isSchoolTypeAlreadyExist = mock(IsSchoolTypeAlreadyExist);
    createdSchoolType = mock(SchoolType);

    handler = new CreateSchoolTypeCommandHandler(
      instance(schoolTypeRepository),
      instance(isSchoolTypeAlreadyExist)
    );
  });

  it('testSchoolTypeCreatedSuccessfully', async () => {
    when(isSchoolTypeAlreadyExist.isSatisfiedBy('Maternelle'))
      .thenResolve(false);
    when(createdSchoolType.getId()).thenReturn(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );
    when(
      schoolTypeRepository.save(deepEqual(new SchoolType('Maternelle')))
    ).thenResolve(instance(createdSchoolType));

    expect(await handler.execute(command)).toBe(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );

    verify(isSchoolTypeAlreadyExist.isSatisfiedBy('Maternelle')).once();
    verify(
      schoolTypeRepository.save(deepEqual(new SchoolType('Maternelle')))
    ).once();
    verify(createdSchoolType.getId()).once();
  });

  it('testSchoolTypeAlreadyExist', async () => {
    when(isSchoolTypeAlreadyExist.isSatisfiedBy('Maternelle'))
      .thenResolve(true);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolTypeAlreadyExistException);
      expect(e.message).toBe('schools.types.errors.already_exist');
      verify(isSchoolTypeAlreadyExist.isSatisfiedBy('Maternelle')).once();
      verify(schoolTypeRepository.save(anything())).never();
      verify(createdSchoolType.getId()).never();
    }
  });
});
