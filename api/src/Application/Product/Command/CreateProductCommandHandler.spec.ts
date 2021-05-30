import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { ProductRepository } from 'src/Infrastructure/Product/Repository/ProductRepository';
import { IsProductAlreadyExist } from 'src/Domain/Product/Specification/IsProductAlreadyExist';
import { Product } from 'src/Domain/Product/Product.entity';
import { CreateProductCommandHandler } from 'src/Application/Product/Command/CreateProductCommandHandler';
import { CreateProductCommand } from 'src/Application/Product/Command/CreateProductCommand';
import { ProductAlreadyExistException } from 'src/Domain/Product/Exception/ProductAlreadyExistException';

describe('CreateProductCommandHandler', () => {
  let productRepository: ProductRepository;
  let isProductAlreadyExist: IsProductAlreadyExist;
  let createdProduct: Product;
  let handler: CreateProductCommandHandler;

  const command = new CreateProductCommand(
    'Mug',
    'Mug portrait enfant',
    9.99,
    1000
  );

  beforeEach(() => {
    productRepository = mock(ProductRepository);
    isProductAlreadyExist = mock(IsProductAlreadyExist);
    createdProduct = mock(Product);

    handler = new CreateProductCommandHandler(
      instance(productRepository),
      instance(isProductAlreadyExist)
    );
  });

  it('testProductCreatedSuccessfully', async () => {
    when(isProductAlreadyExist.isSatisfiedBy('Mug')).thenResolve(false);
    when(createdProduct.getId()).thenReturn(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );
    when(
      productRepository.save(
        deepEqual(
          new Product(
            'Mug',
            'Mug portrait enfant',
            999,
            1000
          )
        )
      )
    ).thenResolve(instance(createdProduct));

    expect(await handler.execute(command)).toBe(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );

    verify(isProductAlreadyExist.isSatisfiedBy('Mug')).once();
    verify(
      productRepository.save(
        deepEqual(
          new Product(
            'Mug',
            'Mug portrait enfant',
            999,
            1000
          )
        )
      )
    ).once();
    verify(createdProduct.getId()).once();
  });

  it('testProductAlreadyExist', async () => {
    when(isProductAlreadyExist.isSatisfiedBy('Mug')).thenResolve(true);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(ProductAlreadyExistException);
      expect(e.message).toBe('products.errors.already_exist');
      verify(isProductAlreadyExist.isSatisfiedBy('Mug')).once();
      verify(productRepository.save(anything())).never();
      verify(createdProduct.getId()).never();
    }
  });
});
