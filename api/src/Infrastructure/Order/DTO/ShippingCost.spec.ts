import { ShippingCostDTO } from './ShippingCostDTO';
import { validate } from 'class-validator';

describe('ShippingCostDTO', () => {
  it('testValidDTO', async () => {
    const dto = new ShippingCostDTO();
    dto.grams = 1000;
    dto.price = 9.99;

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new ShippingCostDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(2);
    expect(validation[0].constraints).toMatchObject({
      isPositive: 'grams must be a positive number'
    });
    expect(validation[1].constraints).toMatchObject({
      isPositive: 'price must be a positive number'
    });
  });
});
