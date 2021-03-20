import { mock, instance, when, verify } from 'ts-mockito';
import { SchoolProduct } from 'src/Domain/School/SchoolProduct.entity';
import { Product } from 'src/Domain/Product/Product.entity';
import { SchoolProductView } from '../../View/SchoolProductView';
import { GetSchoolProductsQuery } from './GetSchoolProductsQuery';
import { GetSchoolProductsQueryHandler } from './GetSchoolProductsQueryHandler';
import { SchoolProductRepository } from 'src/Infrastructure/School/Repository/SchoolProductRepository';
import { ProductSummaryView } from 'src/Application/Product/View/ProductSummaryView';

describe('GetSchoolsQueryHandler', () => {
  it('testGetSchoolProducts', async () => {
    const schoolProductRepository = mock(SchoolProductRepository);

    const product1 = mock(Product);
    when(product1.getTitle()).thenReturn('Photo de classe traditionnelle');
    when(product1.getUnitPrice()).thenReturn(1500);

    const schoolProduct1 = mock(SchoolProduct);
    when(schoolProduct1.getId()).thenReturn(
      '4de2ffc4-e835-44c8-95b7-17c171c09873'
    );
    when(schoolProduct1.getProduct()).thenReturn(instance(product1));
    when(schoolProduct1.getParentUnitPrice()).thenReturn(1200);
    when(schoolProduct1.getUserUnitPrice()).thenReturn(1800);

    const product2 = mock(Product);
    when(product2.getTitle()).thenReturn('1 page individuelle');
    when(product2.getUnitPrice()).thenReturn(1500);

    const schoolProduct2 = mock(SchoolProduct);
    when(schoolProduct2.getId()).thenReturn(
      '12b4aa8a-ece7-45f0-a07e-ca755e67be1e'
    );
    when(schoolProduct2.getProduct()).thenReturn(instance(product2));
    when(schoolProduct2.getParentUnitPrice()).thenReturn(1500);
    when(schoolProduct2.getUserUnitPrice()).thenReturn(1900);

    when(
      schoolProductRepository.findBySchoolId(
        '5eb3173b-97ab-4bbc-b31c-878d4bfafbc1'
      )
    ).thenResolve([instance(schoolProduct1), instance(schoolProduct2)]);

    const queryHandler = new GetSchoolProductsQueryHandler(
      instance(schoolProductRepository)
    );

    const expectedResult = [
      new SchoolProductView(
        '4de2ffc4-e835-44c8-95b7-17c171c09873',
        12,
        18,
        new ProductSummaryView('Photo de classe traditionnelle', 15),
      ),
      new SchoolProductView(
        '12b4aa8a-ece7-45f0-a07e-ca755e67be1e',
        15,
        19,
        new ProductSummaryView('1 page individuelle', 15),
      )
    ];

    expect(
      await queryHandler.execute(
        new GetSchoolProductsQuery('5eb3173b-97ab-4bbc-b31c-878d4bfafbc1')
      )
    ).toMatchObject(expectedResult);
    verify(
      schoolProductRepository.findBySchoolId(
        '5eb3173b-97ab-4bbc-b31c-878d4bfafbc1'
      )
    ).once();
  });
});
