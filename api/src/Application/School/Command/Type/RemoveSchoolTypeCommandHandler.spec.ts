import { mock, instance, when, verify, anything } from 'ts-mockito';
import { SchoolTypeRepository } from 'src/Infrastructure/School/Repository/SchoolTypeRepository';
import { SchoolType } from 'src/Domain/School/SchoolType.entity';
import { RemoveSchoolTypeCommandHandler } from './RemoveSchoolTypeCommandHandler';
import { RemoveSchoolTypeCommand } from './RemoveSchoolTypeCommand';
import { SchoolTypeNotFoundException } from 'src/Domain/School/Exception/SchoolTypeNotFoundException';

describe('RemoveSchoolTypeCommandHandler', () => {
  let schoolTypeRepository: SchoolTypeRepository;
  let removedSchoolType: SchoolType;
  let handler: RemoveSchoolTypeCommandHandler;

  const command = new RemoveSchoolTypeCommand('17efcbee-bd2f-410e-9e99-51684b592bad');

  beforeEach(() => {
    schoolTypeRepository = mock(SchoolTypeRepository);
    removedSchoolType = mock(SchoolType);

    handler = new RemoveSchoolTypeCommandHandler(
      instance(schoolTypeRepository)
    );
  });

  it('testSchoolTypeRemovedSuccessfully', async () => {
    when(schoolTypeRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(instance(removedSchoolType));
    when(removedSchoolType.getId()).thenReturn(
      '17efcbee-bd2f-410e-9e99-51684b592bad'
    );
    when(
      schoolTypeRepository.save(instance(removedSchoolType))
    ).thenResolve(instance(removedSchoolType));

    await handler.execute(command);

    verify(
      schoolTypeRepository.remove(instance(removedSchoolType))
    ).once();
    verify(schoolTypeRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
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
      verify(schoolTypeRepository.remove(anything())).never();
    }
  });
});
