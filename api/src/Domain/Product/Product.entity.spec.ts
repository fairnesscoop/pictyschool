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
    expect(product.getPriceFromCents()).toBe(9.99);
  });

  it('testUpdate', () => {
    const product = new Product(
      'Mug',
      'Mug avec le portrait de l\'enfant',
      999
    );
    expect(product.getId()).toBeUndefined();
    expect(product.getTitle()).toBe('Mug');
    expect(product.getDescription()).toBe('Mug avec le portrait de l\'enfant');
    expect(product.getUnitPrice()).toBe(999);
    expect(product.getPriceFromCents()).toBe(9.99);

    product.update('Porte clef', 'Porte clef portrait', 1000);
    expect(product.getTitle()).toBe('Porte clef');
    expect(product.getDescription()).toBe('Porte clef portrait');
    expect(product.getUnitPrice()).toBe(1000);
    expect(product.getPriceFromCents()).toBe(10);
  });
});
