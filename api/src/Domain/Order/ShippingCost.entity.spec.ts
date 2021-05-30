import { ShippingCost } from './ShippingCost.entity';

describe('ShippingCost', () => {
  it('testGetters', () => {
    const shippingcost = new ShippingCost(
      1000,
      999
    );
    expect(shippingcost.getId()).toBeUndefined();
    expect(shippingcost.getWeight()).toBe(1000);
    expect(shippingcost.getPrice()).toBe(999);
    expect(shippingcost.getPriceFromCents()).toBe(9.99);
  });

  it('testUpdate', () => {
    const shippingcost = new ShippingCost(
      1000,
      999
    );
    expect(shippingcost.getId()).toBeUndefined();
    expect(shippingcost.getWeight()).toBe(1000);
    expect(shippingcost.getPrice()).toBe(999);
    expect(shippingcost.getPriceFromCents()).toBe(9.99);

    shippingcost.update(100, 399);
    expect(shippingcost.getWeight()).toBe(100);
    expect(shippingcost.getPrice()).toBe(399);
    expect(shippingcost.getPriceFromCents()).toBe(3.99);
  });
});
