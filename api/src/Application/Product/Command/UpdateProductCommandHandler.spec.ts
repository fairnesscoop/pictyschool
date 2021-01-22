import { mock, instance, when, verify, anything } from 'ts-mockito';
import { UpdateProductCommandHandler } from './UpdateProductCommandHandler';
import { UpdateProductCommand } from './UpdateProductCommand';
import { ProductRepository } from 'src/Infrastructure/Product/Repository/ProductRepository';
import { IsProductAlreadyExist } from 'src/Domain/Product/Specification/IsProductAlreadyExist';
import { Product } from 'src/Domain/Product/Product.entity';
import { ProductNotFoundException } from 'src/Domain/Product/Exception/ProductNotFoundException';
import { ProductAlreadyExistException } from 'src/Domain/Product/Exception/ProductAlreadyExistException';

describe('UpdateProductCommandHandler', () => {
  let productRepository: ProductRepository;
  let isProductAlreadyExist: IsProductAlreadyExist;

  let handler: UpdateProductCommandHandler;

  const product = mock(Product);
  const command = new UpdateProductCommand(
    '8a9df044-94a7-4e6c-abd1-ecdd69d788d5',
    'Mug',
    9.99,
    'Mug portrait'
  );

  beforeEach(() => {
    productRepository = mock(ProductRepository);
    isProductAlreadyExist = mock(IsProductAlreadyExist);
    handler = new UpdateProductCommandHandler(
      instance(productRepository),
      instance(isProductAlreadyExist)
    );
  });

  it('testProductNotFound', async () => {
    when(
      productRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(ProductNotFoundException);
      expect(e.message).toBe('products.errors.not_found');
      verify(
        productRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
      ).once();
      verify(isProductAlreadyExist.isSatisfiedBy(anything())).never();
      verify(productRepository.save(anything())).never();
      verify(
        product.update(anything(), anything(), anything())
      ).never();
    }
  });

  it('testProductAlreadyExist', async () => {
    when(product.getTitle()).thenReturn('Portrait');
    when(
      productRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(instance(product));
    when(isProductAlreadyExist.isSatisfiedBy('Mug')).thenResolve(true);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(ProductAlreadyExistException);
      expect(e.message).toBe('products.errors.already_exist');
      verify(
        productRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
      ).once();
      verify(
        isProductAlreadyExist.isSatisfiedBy('Mug')
      ).once();
      verify(
        product.update(anything(), anything(), anything())
      ).never();
      verify(productRepository.save(anything())).never();
    }
  });

  it('testSuccessfullyUpdated', async () => {
    when(product.getId()).thenReturn('8a9df044-94a7-4e6c-abd1-ecdd69d788d5');
    when(product.getTitle()).thenReturn('Mug');
    when(
      productRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(instance(product));

    expect(await handler.execute(command)).toBe(
      '8a9df044-94a7-4e6c-abd1-ecdd69d788d5'
    );

    verify(isProductAlreadyExist.isSatisfiedBy(anything())).never();
    verify(
      product.update(
        'Mug',
        'Mug portrait',
        999
      )
    ).calledBefore(productRepository.save(instance(product)));
    verify(productRepository.save(instance(product))).once();
  });
});
