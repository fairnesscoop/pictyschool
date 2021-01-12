import { mock, instance } from 'ts-mockito';
import { SchoolProduct } from './SchoolProduct.entity';
import { School } from './School.entity';
import { Product } from '../Product/Product.entity';

describe('SchoolProductProduct', () => {
  it('testGetters', () => {
    const school = mock(School);
    const product = mock(Product);
    const schoolproduct = new SchoolProduct(
      999,
      instance(school),
      instance(product)
    );
    expect(schoolproduct.getId()).toBeUndefined();
    expect(schoolproduct.getUnitPrice()).toBe(999);
    expect(schoolproduct.getProduct()).toBe(instance(product));
    expect(schoolproduct.getSchool()).toBe(instance(school));
  });

  it('testUpdate', () => {
    const school = mock(School);
    const product = mock(Product);
    const schoolproduct = new SchoolProduct(
      999,
      instance(school),
      instance(product)
    );
    expect(schoolproduct.getUnitPrice()).toBe(999);
    schoolproduct.updateUnitPrice(111);
    expect(schoolproduct.getUnitPrice()).toBe(111);
  });
});
