import { mock, instance } from 'ts-mockito';
import { SchoolProduct } from './SchoolProduct.entity';
import { School } from './School.entity';
import { Product } from '../Product/Product.entity';

describe('SchoolProduct', () => {
  it('testGetters', () => {
    const school = mock(School);
    const product = mock(Product);
    const schoolproduct = new SchoolProduct(
      333,
      999,
      instance(school),
      instance(product)
    );
    expect(schoolproduct.getId()).toBeUndefined();
    expect(schoolproduct.getPhotographerUnitPrice()).toBe(999);
    expect(schoolproduct.getParentUnitPrice()).toBe(333);
    expect(schoolproduct.getProduct()).toBe(instance(product));
    expect(schoolproduct.getSchool()).toBe(instance(school));
  });

  it('testUpdate', () => {
    const school = mock(School);
    const product = mock(Product);
    const schoolproduct = new SchoolProduct(
      333,
      999,
      instance(school),
      instance(product)
    );
    expect(schoolproduct.getPhotographerUnitPrice()).toBe(999);
    expect(schoolproduct.getParentUnitPrice()).toBe(333);
    schoolproduct.updatePrices(111, 444);
    expect(schoolproduct.getPhotographerUnitPrice()).toBe(444);
    expect(schoolproduct.getParentUnitPrice()).toBe(111);
  });
});
