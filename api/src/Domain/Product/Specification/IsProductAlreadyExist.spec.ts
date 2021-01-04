import { mock, instance, when, verify, anything } from 'ts-mockito';
import { ProductRepository } from 'src/Infrastructure/Product/Repository/ProductRepository';
import { IsProductAlreadyExist } from 'src/Domain/Product/Specification/IsProductAlreadyExist';
import { Product } from 'src/Domain/Product/Product.entity';

describe('IsProductAlreadyExist', () => {
  let productRepository: ProductRepository;
  let isProductAlreadyExist: IsProductAlreadyExist;

  beforeEach(() => {
    productRepository = mock(ProductRepository);
    isProductAlreadyExist = new IsProductAlreadyExist(
      instance(productRepository)
    );
  });

  it('testProductAlreadyExist', async () => {
    when(productRepository.findOneByTitle('Mug')).thenResolve(
      new Product('Mug', anything(), anything())
    );
    expect(await isProductAlreadyExist.isSatisfiedBy('Mug')).toBe(
      true
    );
    verify(productRepository.findOneByTitle('Mug')).once();
  });

  it('testProductDontExist', async () => {
    when(productRepository.findOneByTitle('Mug')).thenResolve(null);
    expect(await isProductAlreadyExist.isSatisfiedBy('Mug')).toBe(
      false
    );
    verify(productRepository.findOneByTitle('Mug')).once();
  });
});
