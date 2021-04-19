import { mock, instance, when, verify, anything } from 'ts-mockito';
import { ProductRepository } from 'src/Infrastructure/Product/Repository/ProductRepository';
import { Product } from 'src/Domain/Product/Product.entity';
import { RemoveProductCommandHandler } from './RemoveProductCommandHandler';
import { RemoveProductCommand } from './RemoveProductCommand';
import { ProductNotFoundException } from 'src/Domain/Product/Exception/ProductNotFoundException';

describe('RemoveProductCommandHandler', () => {
  let productRepository: ProductRepository;
  let removedProduct: Product;
  let handler: RemoveProductCommandHandler;

  const command = new RemoveProductCommand('17efcbee-bd2f-410e-9e99-51684b592bad');

  beforeEach(() => {
    productRepository = mock(ProductRepository);
    removedProduct = mock(Product);

    handler = new RemoveProductCommandHandler(
      instance(productRepository)
    );
  });

  it('testProductRemovedSuccessfully', async () => {
    when(productRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(instance(removedProduct));

    await handler.execute(command);

    verify(
      productRepository.remove(instance(removedProduct))
    ).once();
    verify(productRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
  });

  it('testProductNotFound', async () => {
    when(productRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(ProductNotFoundException);
      expect(e.message).toBe('products.errors.not_found');
      verify(productRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
      verify(productRepository.remove(anything())).never();
    }
  });
});
