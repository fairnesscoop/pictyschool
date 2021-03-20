import { Product } from 'src/Domain/Product/Product.entity';
import { SchoolProductRepository } from 'src/Infrastructure/School/Repository/SchoolProductRepository';
import { mock, instance, when, verify } from 'ts-mockito';
import { School } from '../../School.entity';
import { SchoolProduct } from '../../SchoolProduct.entity';
import { IsSchoolProductAlreadyExist } from './IsSchoolProductAlreadyExist';

describe('IsSchoolProductAlreadyExist', () => {
  let schoolproductRepository: SchoolProductRepository;
  let isSchoolProductAlreadyExist: IsSchoolProductAlreadyExist;

  const product = mock(Product);
  const school = mock(School);

  beforeEach(() => {
    schoolproductRepository = mock(SchoolProductRepository);
    isSchoolProductAlreadyExist = new IsSchoolProductAlreadyExist(
      instance(schoolproductRepository)
    );
  });

  it('testSchoolProductAlreadyExist', async () => {
    when(schoolproductRepository.findOneBySchoolAndProduct(instance(school), instance(product)))
      .thenResolve(new SchoolProduct(333, 999, instance(school), instance(product)));
    expect(await isSchoolProductAlreadyExist.isSatisfiedBy(instance(school), instance(product))).toBe(
      true
    );
    verify(schoolproductRepository.findOneBySchoolAndProduct(instance(school), instance(product))).once();
  });

  it('testSchoolProductDontExist', async () => {
    when(schoolproductRepository.findOneBySchoolAndProduct(instance(school), instance(product)))
      .thenResolve(null);
    expect(await isSchoolProductAlreadyExist.isSatisfiedBy(instance(school), instance(product))).toBe(
      false
    );
    verify(schoolproductRepository.findOneBySchoolAndProduct(instance(school), instance(product))).once();
  });
});
