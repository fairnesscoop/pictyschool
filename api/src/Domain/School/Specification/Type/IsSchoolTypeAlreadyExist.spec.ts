import { SchoolTypeRepository } from 'src/Infrastructure/School/Repository/SchoolTypeRepository';
import { mock, instance, when, verify } from 'ts-mockito';
import { SchoolType } from '../../SchoolType.entity';
import { IsSchoolTypeAlreadyExist } from './IsSchoolTypeAlreadyExist';

describe('IsSchoolTypeAlreadyExist', () => {
  let schooltypeRepository: SchoolTypeRepository;
  let isSchoolTypeAlreadyExist: IsSchoolTypeAlreadyExist;

  beforeEach(() => {
    schooltypeRepository = mock(SchoolTypeRepository);
    isSchoolTypeAlreadyExist = new IsSchoolTypeAlreadyExist(
      instance(schooltypeRepository)
    );
  });

  it('testSchoolTypeAlreadyExist', async () => {
    when(schooltypeRepository.findOneByName('Maternelle'))
      .thenResolve(new SchoolType('Maternelle'));
    expect(await isSchoolTypeAlreadyExist.isSatisfiedBy('Maternelle')).toBe(
      true
    );
    verify(schooltypeRepository.findOneByName('Maternelle')).once();
  });

  it('testSchoolTypeDontExist', async () => {
    when(schooltypeRepository.findOneByName('maternelle'))
      .thenResolve(null);
    expect(await isSchoolTypeAlreadyExist.isSatisfiedBy('maternelle')).toBe(
      false
    );
    verify(schooltypeRepository.findOneByName('maternelle')).once();
  });
});
