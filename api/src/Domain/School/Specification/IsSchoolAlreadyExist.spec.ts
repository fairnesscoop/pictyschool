import { mock, instance, when, verify, anything } from 'ts-mockito';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { IsSchoolAlreadyExist } from 'src/Domain/School/Specification/IsSchoolAlreadyExist';
import { School } from 'src/Domain/School/School.entity';

describe('IsSchoolAlreadyExist', () => {
  let schoolRepository: SchoolRepository;
  let isSchoolAlreadyExist: IsSchoolAlreadyExist;

  beforeEach(() => {
    schoolRepository = mock(SchoolRepository);
    isSchoolAlreadyExist = new IsSchoolAlreadyExist(
      instance(schoolRepository)
    );
  });

  it('testSchoolAlreadyExist', async () => {
    when(schoolRepository.findOneByReference('xjsoi2')).thenResolve(
      new School('xjsoi2',
        anything(),
        anything(),
        anything(),
        anything(),
        anything(),
        anything()
      )
    );
    expect(await isSchoolAlreadyExist.isSatisfiedBy('xjsoi2')).toBe(
      true
    );
    verify(schoolRepository.findOneByReference('xjsoi2')).once();
  });

  it('testSchoolDontExist', async () => {
    when(schoolRepository.findOneByReference('xjsoi2')).thenResolve(null);
    expect(await isSchoolAlreadyExist.isSatisfiedBy('xjsoi2')).toBe(
      false
    );
    verify(schoolRepository.findOneByReference('xjsoi2')).once();
  });
});
