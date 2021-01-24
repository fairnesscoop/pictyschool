import { SchoolTypeDTO } from './SchoolTypeDTO';
import { validate } from 'class-validator';

describe('SchoolTypeDTO', () => {
  it('testValidDTO', async () => {
    const dto = new SchoolTypeDTO();
    dto.name = 'Maternelle';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new SchoolTypeDTO();
    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'name should not be empty'
    });
  });
});
