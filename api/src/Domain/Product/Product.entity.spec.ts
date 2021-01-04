import { Product } from './Product.entity';

describe('Product', () => {
  it('testGetters', () => {
    const product = new Product(
      'Mug',
      'Mug avec le portrait de l\'enfant',
      999
    );
    expect(product.getId()).toBeUndefined();
    expect(product.getTitle()).toBe('Mug');
    expect(product.getDescription()).toBe('Mug avec le portrait de l\'enfant');
    expect(product.getUnitPrice()).toBe(999);
  });
});
