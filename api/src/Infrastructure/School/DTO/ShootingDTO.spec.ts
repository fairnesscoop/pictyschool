import { ShootingDTO } from './ShootingDTO';
import { validate } from 'class-validator';

describe('ShootingDTO', () => {
  it('testValidDTO', async () => {
    const dto = new ShootingDTO();
    dto.shootingDate = '2019-12-19T11:20:04.568Z';
    dto.closingDate = '2019-12-20T11:20:04.568Z';
    dto.name = 'Prise de vue fin année';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testEmptyDTO', async () => {
    const dto = new ShootingDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(3);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'name should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isDateString: 'shootingDate must be a ISOString',
      isNotEmpty: 'shootingDate should not be empty'
    });
    expect(validation[2].constraints).toMatchObject({
      dateGreaterOrEqualThan: 'closingDate should be greater or equal than shootingDate',
      isDateString: 'closingDate must be a ISOString',
      isNotEmpty: 'closingDate should not be empty'
    });
  });
});
