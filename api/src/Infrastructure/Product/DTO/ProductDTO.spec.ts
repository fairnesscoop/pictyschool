import { ProductDTO } from './ProductDTO';
import { validate } from 'class-validator';

describe('ProductDTO', () => {
  it('testValidDTO', async () => {
    const dto = new ProductDTO();
    dto.title = 'Mug';
    dto.description = 'Mug portrait enfant';
    dto.unitPrice = 999;
    dto.weight = 1000;

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new ProductDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(3);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'title should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isPositive: 'unitPrice must be a positive number'
    });
    expect(validation[2].constraints).toMatchObject({
      isPositive: 'weight must be a positive number'
    });
  });
});
