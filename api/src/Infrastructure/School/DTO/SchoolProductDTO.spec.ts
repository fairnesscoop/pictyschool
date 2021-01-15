import { SchoolProductDTO } from './SchoolProductDTO';
import { validate } from 'class-validator';

describe('SchoolProductDTO', () => {
  it('testValidDTO', async () => {
    const dto = new SchoolProductDTO();
    dto.productId = '401e3e39-f367-4f95-863b-69f750fff8bb';
    dto.unitPrice = 999;

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new SchoolProductDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(2);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'productId should not be empty',
      isUuid: 'productId must be an UUID'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'unitPrice should not be empty',
      isPositive: 'unitPrice must be a positive number'
    });
  });
});
