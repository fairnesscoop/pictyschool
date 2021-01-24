import { Product } from 'src/Domain/Product/Product.entity';
import { SchoolTypeNotFoundException } from 'src/Domain/School/Exception/SchoolTypeNotFoundException';
import { SchoolType } from 'src/Domain/School/SchoolType.entity';
import { SchoolTypeRepository } from 'src/Infrastructure/School/Repository/SchoolTypeRepository';
import { mock, instance, when, verify } from 'ts-mockito';
import { SchoolTypeView } from '../../View/SchoolTypeView';
import { GetSchoolTypeByIdQuery } from './GetSchoolTypeByIdQuery';
import { GetSchoolTypeByIdQueryHandler } from './GetSchoolTypeByIdQueryHandler';

describe('GetSchoolTypeByIdQueryHandler', () => {
  const query = new GetSchoolTypeByIdQuery('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');

  it('testGetSchoolType', async () => {
    const schoolTypeRepository = mock(SchoolTypeRepository);
    const queryHandler = new GetSchoolTypeByIdQueryHandler(instance(schoolTypeRepository));
    const expectedResult = new SchoolTypeView(
      'eb9e1d9b-dce2-48a9-B64F-f0872f3157d2',
      'Maternelle'
    );

    const product = mock(Product);
    when(product.getTitle()).thenReturn('Tasse à café');
    when(product.getUnitPrice()).thenReturn(900);

    const schooltype = mock(SchoolType);
    when(schooltype.getId()).thenReturn('eb9e1d9b-dce2-48a9-B64F-f0872f3157d2');
    when(schooltype.getName()).thenReturn('Maternelle');
    when(
      schoolTypeRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(schooltype));

    expect(await queryHandler.execute(query)).toMatchObject(expectedResult);

    verify(
      schoolTypeRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
  });

  it('testGetSchoolTypeNotFound', async () => {
    const schoolTypeRepository = mock(SchoolTypeRepository);
    const queryHandler = new GetSchoolTypeByIdQueryHandler(instance(schoolTypeRepository));
    when(
      schoolTypeRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(null);

    try {
      expect(await queryHandler.execute(query)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolTypeNotFoundException);
      expect(e.message).toBe('schools.types.errors.not_found');
      verify(
        schoolTypeRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
    }
  });
});
