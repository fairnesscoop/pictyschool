import { mock, instance, when, verify } from 'ts-mockito';
import { GetProductsQueryHandler } from 'src/Application/Product/Query/GetProductsQueryHandler';
import { ProductRepository } from 'src/Infrastructure/Product/Repository/ProductRepository';
import { GetProductsQuery } from 'src/Application/Product/Query/GetProductsQuery';
import { Product } from 'src/Domain/Product/Product.entity';
import { ProductView } from 'src/Application/Product/View/ProductView';
import { Pagination } from 'src/Application/Common/Pagination';

describe('GetProductsQueryHandler', () => {
  it('testGetProducts', async () => {
    const productRepository = mock(ProductRepository);

    const product1 = mock(Product);
    when(product1.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(product1.getTitle()).thenReturn('Mug');
    when(product1.getDescription()).thenReturn('Mug portrait enfant');
    when(product1.getPriceFromCents()).thenReturn(9.99);

    const product2 = mock(Product);
    when(product2.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(product2.getTitle()).thenReturn('Porte clef');
    when(product2.getPriceFromCents()).thenReturn(10);

    when(productRepository.findProducts(1)).thenResolve([
      [instance(product2), instance(product1)],
      2
    ]);

    const queryHandler = new GetProductsQueryHandler(instance(productRepository));

    const expectedResult = new Pagination<ProductView>(
      [
        new ProductView(
          'd54f15d6-1a1d-47e8-8672-9f46018f9960',
          'Porte clef',
          10,
          null
        ),
        new ProductView(
          'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
          'Mug',
          9.99,
          'Mug portrait enfant'
        )
      ],
      2
    );

    expect(await queryHandler.execute(new GetProductsQuery(1))).toMatchObject(
      expectedResult
    );
    verify(productRepository.findProducts(1)).once();
  });
});
