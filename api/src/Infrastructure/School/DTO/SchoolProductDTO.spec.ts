import { SchoolProductDTO } from './SchoolProductDTO';
import { validate } from 'class-validator';

describe('SchoolProductDTO', () => {
  it('testValidDTO', async () => {
    const dto = new SchoolProductDTO();
    dto.productId = '401e3e39-f367-4f95-863b-69f750fff8bb';
    dto.photographerUnitPrice = 999;
    dto.parentUnitPrice = 333;

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new SchoolProductDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(3);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'productId should not be empty',
      isUuid: 'productId must be an UUID'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'parentUnitPrice should not be empty',
      isPositive: 'parentUnitPrice must be a positive number'
    });
    expect(validation[2].constraints).toMatchObject({
      isNotEmpty: 'photographerUnitPrice should not be empty',
      isPositive: 'photographerUnitPrice must be a positive number'
    });
  });
});
