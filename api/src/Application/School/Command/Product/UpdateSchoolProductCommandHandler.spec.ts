import { mock, instance, when, verify, anything } from 'ts-mockito';
import { SchoolProductRepository } from 'src/Infrastructure/School/Repository/SchoolProductRepository';
import { SchoolProduct } from 'src/Domain/School/SchoolProduct.entity';
import { UpdateSchoolProductCommandHandler } from './UpdateSchoolProductCommandHandler';
import { UpdateSchoolProductCommand } from './UpdateSchoolProductCommand';
import { SchoolProductNotFoundException } from 'src/Domain/School/Exception/SchoolProductNotFoundException';

describe('UpdateSchoolProductCommandHandler', () => {
  let schoolProductRepository: SchoolProductRepository;
  let updatedSchoolProduct: SchoolProduct;
  let handler: UpdateSchoolProductCommandHandler;

  const command = new UpdateSchoolProductCommand(
    '17efcbee-bd2f-410e-9e99-51684b592bad',
    9.99,
  );

  beforeEach(() => {
    schoolProductRepository = mock(SchoolProductRepository);
    updatedSchoolProduct = mock(SchoolProduct);

    handler = new UpdateSchoolProductCommandHandler(
      instance(schoolProductRepository)
    );
  });

  it('testSchoolProductUpdatedSuccessfully', async () => {
    when(schoolProductRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(instance(updatedSchoolProduct));
    when(updatedSchoolProduct.getId()).thenReturn(
      '17efcbee-bd2f-410e-9e99-51684b592bad'
    );
    when(
      schoolProductRepository.save(instance(updatedSchoolProduct))
    ).thenResolve(instance(updatedSchoolProduct));

    expect(await handler.execute(command)).toBe(
      '17efcbee-bd2f-410e-9e99-51684b592bad'
    );

    verify(
      schoolProductRepository.save(instance(updatedSchoolProduct))
    ).once();
    verify(updatedSchoolProduct.getId()).once();
    verify(updatedSchoolProduct.updateUnitPrice(999)).once();
    verify(schoolProductRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
  });

  it('testSchoolProductNotFound', async () => {
    when(schoolProductRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolProductNotFoundException);
      expect(e.message).toBe('school_products.errors.not_found');
      verify(schoolProductRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
      verify(schoolProductRepository.save(anything())).never();
    }
  });
});
