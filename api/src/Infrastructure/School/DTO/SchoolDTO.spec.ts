import { SchoolDTO } from './SchoolDTO';
import { validate } from 'class-validator';

describe('LoginDTO', () => {
  it('testValidDTO', async () => {
    const dto = new SchoolDTO();
    dto.reference = 'xLKJs';
    dto.address = '127 rue Bélliard';
    dto.city = 'Paris';
    dto.zipCode = '75018';
    dto.name = 'Ecole élémentaire';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new SchoolDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(2);
    expect(validation[0].constraints).toMatchObject({
      isEmail: 'email must be an email'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'password should not be empty'
    });
  });
});
