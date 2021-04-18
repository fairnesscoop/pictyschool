import { DiscountDTO } from './DiscountDTO';
import { validate } from 'class-validator';
import { DiscountType } from 'src/Domain/School/Discount.entity';

describe('DiscountDTO', () => {
  it('testValidDTO', async () => {
    const dto = new DiscountDTO();
    dto.amount = 333;
    dto.value = 999;
    dto.type = DiscountType.PERCENT;

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new DiscountDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(3);
    expect(validation[0].constraints).toMatchObject({
      isEnum: 'type must be a valid enum value',
      isNotEmpty: 'type should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'amount should not be empty',
      isPositive: 'amount must be a positive number'
    });
    expect(validation[2].constraints).toMatchObject({
      isNotEmpty: 'value should not be empty',
      isPositive: 'value must be a positive number'
    });
  });
});
