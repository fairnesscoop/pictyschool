import { mock, instance, when, verify } from 'ts-mockito';
import { SchoolType } from 'src/Domain/School/SchoolType.entity';
import { SchoolTypeRepository } from 'src/Infrastructure/School/Repository/SchoolTypeRepository';
import { SchoolTypeView } from '../../View/SchoolTypeView';
import { GetSchoolTypesQueryHandler } from './GetSchoolTypesQueryHandler';
import { GetSchoolTypesQuery } from './GetSchoolTypesQuery';

describe('GetSchoolsQueryHandler', () => {
  it('testGetSchoolTypes', async () => {
    const schoolTypeRepository = mock(SchoolTypeRepository);

    const schoolType1 = mock(SchoolType);
    when(schoolType1.getId()).thenReturn(
      '4de2ffc4-e835-44c8-95b7-17c171c09873'
    );
    when(schoolType1.getName()).thenReturn('Maternelle');

    const schoolType2 = mock(SchoolType);
    when(schoolType2.getId()).thenReturn(
      '12b4aa8a-ece7-45f0-a07e-ca755e67be1e'
    );
    when(schoolType2.getName()).thenReturn('Collège');

    when(
      schoolTypeRepository.findAll()
    ).thenResolve([instance(schoolType1), instance(schoolType2)]);

    const queryHandler = new GetSchoolTypesQueryHandler(
      instance(schoolTypeRepository)
    );

    const expectedResult = [
      new SchoolTypeView(
        '4de2ffc4-e835-44c8-95b7-17c171c09873',
        'Maternelle'
      ),
      new SchoolTypeView(
        '12b4aa8a-ece7-45f0-a07e-ca755e67be1e',
        'Collège'
      )
    ];

    expect(
      await queryHandler.execute(new GetSchoolTypesQuery())
    ).toMatchObject(expectedResult);
    verify(
      schoolTypeRepository.findAll()
    ).once();
  });
});
