import { ShippingCost } from './ShippingCost.entity';

describe('ShippingCost', () => {
  it('testGetters', () => {
    const shippingcost = new ShippingCost(
      1000,
      999
    );
    expect(shippingcost.getId()).toBeUndefined();
    expect(shippingcost.getGrams()).toBe(1000);
    expect(shippingcost.getPrice()).toBe(999);
    expect(shippingcost.getPriceFromCents()).toBe(9.99);
  });
});
