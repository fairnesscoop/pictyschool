import { UnitPriceDTO } from './UnitPriceDTO';
import { validate } from 'class-validator';

describe('UnitPriceDTO', () => {
  it('testValidDTO', async () => {
    const dto = new UnitPriceDTO();
    dto.unitPrice = 999;

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new UnitPriceDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'unitPrice should not be empty',
      isPositive: 'unitPrice must be a positive number'
    });
  });
});
