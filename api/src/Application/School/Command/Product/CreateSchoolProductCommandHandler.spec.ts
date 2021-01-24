import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { IsSchoolProductAlreadyExist } from 'src/Domain/School/Specification/Product/IsSchoolProductAlreadyExist';
import { SchoolProductRepository } from 'src/Infrastructure/School/Repository/SchoolProductRepository';
import { SchoolProduct } from 'src/Domain/School/SchoolProduct.entity';
import { CreateSchoolProductCommandHandler } from './CreateSchoolProductCommandHandler';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { ProductRepository } from 'src/Infrastructure/Product/Repository/ProductRepository';
import { CreateSchoolProductCommand } from './CreateSchoolProductCommand';
import { Product } from 'src/Domain/Product/Product.entity';
import { School } from 'src/Domain/School/School.entity';
import { SchoolProductAlreadyExistException } from 'src/Domain/School/Exception/SchoolProductAlreadyExistException';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { ProductNotFoundException } from 'src/Domain/Product/Exception/ProductNotFoundException';

describe('CreateSchoolProductCommandHandler', () => {
  let schoolRepository: SchoolRepository;
  let productRepository: ProductRepository;
  let schoolProductRepository: SchoolProductRepository;
  let isSchoolProductAlreadyExist: IsSchoolProductAlreadyExist;
  let createdSchoolProduct: SchoolProduct;
  let handler: CreateSchoolProductCommandHandler;

  const product = mock(Product);
  const school = mock(School);
  const command = new CreateSchoolProductCommand(
    9.99,
    '553e2b3c-eb11-42b1-8f76-903add071ca7',
    '17efcbee-bd2f-410e-9e99-51684b592bad'
  );

  beforeEach(() => {
    schoolRepository = mock(SchoolRepository);
    productRepository = mock(ProductRepository);
    schoolProductRepository = mock(SchoolProductRepository);
    isSchoolProductAlreadyExist = mock(IsSchoolProductAlreadyExist);
    createdSchoolProduct = mock(SchoolProduct);

    handler = new CreateSchoolProductCommandHandler(
      instance(schoolRepository),
      instance(productRepository),
      instance(schoolProductRepository),
      instance(isSchoolProductAlreadyExist)
    );
  });

  it('testSchoolProductCreatedSuccessfully', async () => {
    when(productRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(instance(product));
    when(schoolRepository.findOneById('553e2b3c-eb11-42b1-8f76-903add071ca7'))
      .thenResolve(instance(school));
    when(isSchoolProductAlreadyExist.isSatisfiedBy(instance(school), instance(product)))
      .thenResolve(false);
    when(createdSchoolProduct.getId()).thenReturn(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );
    when(
      schoolProductRepository.save(
        deepEqual(
          new SchoolProduct(
            999,
            instance(school),
            instance(product)
          )
        )
      )
    ).thenResolve(instance(createdSchoolProduct));

    expect(await handler.execute(command)).toBe(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );

    verify(isSchoolProductAlreadyExist.isSatisfiedBy(instance(school), instance(product))).once();
    verify(
      schoolProductRepository.save(
        deepEqual(
          new SchoolProduct(
            999,
            instance(school),
            instance(product)
          )
        )
      )
    ).once();
    verify(createdSchoolProduct.getId()).once();
    verify(productRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
    verify(schoolRepository.findOneById('553e2b3c-eb11-42b1-8f76-903add071ca7')).once();
  });

  it('testSchoolProductAlreadyExist', async () => {
    when(productRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(instance(product));
    when(schoolRepository.findOneById('553e2b3c-eb11-42b1-8f76-903add071ca7'))
      .thenResolve(instance(school));
    when(isSchoolProductAlreadyExist.isSatisfiedBy(instance(school), instance(product)))
      .thenResolve(true);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolProductAlreadyExistException);
      expect(e.message).toBe('schools.products.errors.already_exist');
      verify(productRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
      verify(schoolRepository.findOneById('553e2b3c-eb11-42b1-8f76-903add071ca7')).once();
      verify(isSchoolProductAlreadyExist.isSatisfiedBy(instance(school), instance(product))).once();
      verify(schoolProductRepository.save(anything())).never();
      verify(createdSchoolProduct.getId()).never();
    }
  });

  it('testSchoolNotFound', async () => {
    when(productRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(instance(product));
    when(schoolRepository.findOneById('553e2b3c-eb11-42b1-8f76-903add071ca7'))
      .thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolNotFoundException);
      expect(e.message).toBe('schools.errors.not_found');
      verify(productRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
      verify(schoolRepository.findOneById('553e2b3c-eb11-42b1-8f76-903add071ca7')).once();
      verify(isSchoolProductAlreadyExist.isSatisfiedBy(instance(school), instance(product))).never();
      verify(schoolProductRepository.save(anything())).never();
      verify(createdSchoolProduct.getId()).never();
    }
  });

  it('testProductNotFound', async () => {
    when(productRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(null);
    when(schoolRepository.findOneById('553e2b3c-eb11-42b1-8f76-903add071ca7'))
      .thenResolve(instance(school));

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(ProductNotFoundException);
      expect(e.message).toBe('products.errors.not_found');
      verify(productRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
      verify(schoolRepository.findOneById('553e2b3c-eb11-42b1-8f76-903add071ca7')).once();
      verify(isSchoolProductAlreadyExist.isSatisfiedBy(instance(school), instance(product))).never();
      verify(schoolProductRepository.save(anything())).never();
      verify(createdSchoolProduct.getId()).never();
    }
  });
});
