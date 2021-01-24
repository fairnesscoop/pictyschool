import { mock, instance, when, verify, anything } from 'ts-mockito';
import { SchoolTypeRepository } from 'src/Infrastructure/School/Repository/SchoolTypeRepository';
import { SchoolType } from 'src/Domain/School/SchoolType.entity';
import { UpdateSchoolTypeCommandHandler } from './UpdateSchoolTypeCommandHandler';
import { UpdateSchoolTypeCommand } from './UpdateSchoolTypeCommand';
import { SchoolTypeNotFoundException } from 'src/Domain/School/Exception/SchoolTypeNotFoundException';
import { IsSchoolTypeAlreadyExist } from 'src/Domain/School/Specification/Type/IsSchoolTypeAlreadyExist';
import { SchoolTypeAlreadyExistException } from 'src/Domain/School/Exception/SchoolTypeAlreadyExistException';

describe('UpdateSchoolTypeCommandHandler', () => {
  let schoolTypeRepository: SchoolTypeRepository;
  let isSchoolTypeAlreadyExist: IsSchoolTypeAlreadyExist;
  let updatedSchoolType: SchoolType;
  let handler: UpdateSchoolTypeCommandHandler;

  const command = new UpdateSchoolTypeCommand(
    '17efcbee-bd2f-410e-9e99-51684b592bad',
    'Maternelle'
  );

  beforeEach(() => {
    isSchoolTypeAlreadyExist = mock(IsSchoolTypeAlreadyExist);
    schoolTypeRepository = mock(SchoolTypeRepository);
    updatedSchoolType = mock(SchoolType);

    handler = new UpdateSchoolTypeCommandHandler(
      instance(schoolTypeRepository),
      instance(isSchoolTypeAlreadyExist),
    );
  });

  it('testSchoolTypeUpdatedSuccessfully', async () => {
    when(schoolTypeRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(instance(updatedSchoolType));
    when(updatedSchoolType.getId()).thenReturn(
      '17efcbee-bd2f-410e-9e99-51684b592bad'
    );
    when(updatedSchoolType.getName()).thenReturn('Maternelle');
    when(
      schoolTypeRepository.save(instance(updatedSchoolType))
    ).thenResolve(instance(updatedSchoolType));

    expect(await handler.execute(command)).toBe(
      '17efcbee-bd2f-410e-9e99-51684b592bad'
    );

    verify(updatedSchoolType.update('Maternelle')).once();
    verify(
      schoolTypeRepository.save(instance(updatedSchoolType))
    ).once();
    verify(updatedSchoolType.getId()).once();
    verify(isSchoolTypeAlreadyExist.isSatisfiedBy('Maternelle')).never();
    verify(schoolTypeRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
  });

  it('testSchoolTypeAlreadyExist', async () => {
    when(schoolTypeRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(instance(updatedSchoolType));
    when(updatedSchoolType.getName()).thenReturn('Collège');
    when(isSchoolTypeAlreadyExist.isSatisfiedBy('Maternelle')).thenResolve(true);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolTypeAlreadyExistException);
      expect(e.message).toBe('schools.types.errors.already_exist');
      verify(schoolTypeRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
      verify(schoolTypeRepository.save(anything())).never();
      verify(isSchoolTypeAlreadyExist.isSatisfiedBy('Maternelle')).once();
    }
  });

  it('testSchoolTypeNotFound', async () => {
    when(schoolTypeRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolTypeNotFoundException);
      expect(e.message).toBe('schools.types.errors.not_found');
      verify(schoolTypeRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
      verify(schoolTypeRepository.save(anything())).never();
    }
  });
});
