import { ProductSummaryView } from 'src/Application/Product/View/ProductSummaryView';
import { Product } from 'src/Domain/Product/Product.entity';
import { SchoolProductNotFoundException } from 'src/Domain/School/Exception/SchoolProductNotFoundException';
import { SchoolProduct } from 'src/Domain/School/SchoolProduct.entity';
import { SchoolProductRepository } from 'src/Infrastructure/School/Repository/SchoolProductRepository';
import { mock, instance, when, verify } from 'ts-mockito';
import { SchoolProductView } from '../../View/SchoolProductView';
import { GetSchoolProductByIdQuery } from './GetSchoolProductByIdQuery';
import { GetSchoolProductByIdQueryHandler } from './GetSchoolProductByIdQueryHandler';

describe('GetSchoolProductByIdQueryHandler', () => {
  const query = new GetSchoolProductByIdQuery('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');

  it('testGetSchoolProduct', async () => {
    const schoolproductRepository = mock(SchoolProductRepository);
    const queryHandler = new GetSchoolProductByIdQueryHandler(instance(schoolproductRepository));
    const expectedResult = new SchoolProductView(
      'eb9e1d9b-dce2-48a9-B64F-f0872f3157d2',
      3.99,
      9.99,
      new ProductSummaryView('Tasse à café', 9)
    );

    const product = mock(Product);
    when(product.getTitle()).thenReturn('Tasse à café');
    when(product.getUnitPrice()).thenReturn(900);

    const schoolproduct = mock(SchoolProduct);
    when(schoolproduct.getId()).thenReturn('eb9e1d9b-dce2-48a9-B64F-f0872f3157d2');
    when(schoolproduct.getParentUnitPrice()).thenReturn(399);
    when(schoolproduct.getUserUnitPrice()).thenReturn(999);
    when(schoolproduct.getProduct()).thenReturn(instance(product));
    when(
      schoolproductRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(schoolproduct));

    expect(await queryHandler.execute(query)).toMatchObject(expectedResult);

    verify(
      schoolproductRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
  });

  it('testGetSchoolProductNotFound', async () => {
    const schoolproductRepository = mock(SchoolProductRepository);
    const queryHandler = new GetSchoolProductByIdQueryHandler(instance(schoolproductRepository));
    when(
      schoolproductRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(null);

    try {
      expect(await queryHandler.execute(query)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolProductNotFoundException);
      expect(e.message).toBe('schools.products.errors.not_found');
      verify(
        schoolproductRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
    }
  });
});
