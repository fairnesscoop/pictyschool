import { mock, instance, when, verify, anything } from 'ts-mockito';
import { SchoolProductRepository } from 'src/Infrastructure/School/Repository/SchoolProductRepository';
import { SchoolProduct } from 'src/Domain/School/SchoolProduct.entity';
import { RemoveSchoolProductCommandHandler } from './RemoveSchoolProductCommandHandler';
import { RemoveSchoolProductCommand } from './RemoveSchoolProductCommand';
import { SchoolProductNotFoundException } from 'src/Domain/School/Exception/SchoolProductNotFoundException';

describe('RemoveSchoolProductCommandHandler', () => {
  let schoolProductRepository: SchoolProductRepository;
  let removedSchoolProduct: SchoolProduct;
  let handler: RemoveSchoolProductCommandHandler;

  const command = new RemoveSchoolProductCommand('17efcbee-bd2f-410e-9e99-51684b592bad');

  beforeEach(() => {
    schoolProductRepository = mock(SchoolProductRepository);
    removedSchoolProduct = mock(SchoolProduct);

    handler = new RemoveSchoolProductCommandHandler(
      instance(schoolProductRepository)
    );
  });

  it('testSchoolProductRemovedSuccessfully', async () => {
    when(schoolProductRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(instance(removedSchoolProduct));
    when(removedSchoolProduct.getId()).thenReturn(
      '17efcbee-bd2f-410e-9e99-51684b592bad'
    );
    when(
      schoolProductRepository.save(instance(removedSchoolProduct))
    ).thenResolve(instance(removedSchoolProduct));

    await handler.execute(command);

    verify(
      schoolProductRepository.remove(instance(removedSchoolProduct))
    ).once();
    verify(schoolProductRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
  });

  it('testSchoolProductNotFound', async () => {
    when(schoolProductRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolProductNotFoundException);
      expect(e.message).toBe('schools.products.errors.not_found');
      verify(schoolProductRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
      verify(schoolProductRepository.remove(anything())).never();
    }
  });
});
