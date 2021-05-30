import { mock, instance, when, verify } from 'ts-mockito';
import { ProductRepository } from 'src/Infrastructure/Product/Repository/ProductRepository';
import { Product } from 'src/Domain/Product/Product.entity';
import { ProductView } from 'src/Application/Product/View/ProductView';
import { GetProductByIdQueryHandler } from './GetProductByIdQueryHandler';
import { GetProductByIdQuery } from './GetProductByIdQuery';
import { ProductNotFoundException } from 'src/Domain/Product/Exception/ProductNotFoundException';

describe('GetProductByIdQueryHandler', () => {
  const query = new GetProductByIdQuery('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');

  it('testGetProduct', async () => {
    const productRepository = mock(ProductRepository);
    const queryHandler = new GetProductByIdQueryHandler(instance(productRepository));
    const expectedResult = new ProductView(
      'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
      'Mug',
      9.99,
      1000,
      'Mug portrait enfant'
    );

    const product = mock(Product);
    when(product.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(product.getTitle()).thenReturn('Mug');
    when(product.getDescription()).thenReturn('Mug portrait enfant');
    when(product.getWeight()).thenReturn(1000);
    when(product.getPriceFromCents()).thenReturn(9.99);
    when(
      productRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(product));

    expect(await queryHandler.execute(query)).toMatchObject(expectedResult);

    verify(
      productRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
  });

  it('testGetProductNotFound', async () => {
    const productRepository = mock(ProductRepository);
    const queryHandler = new GetProductByIdQueryHandler(instance(productRepository));
    when(
      productRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(null);

    try {
      expect(await queryHandler.execute(query)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(ProductNotFoundException);
      expect(e.message).toBe('products.errors.not_found');
      verify(
        productRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
    }
  });
});
