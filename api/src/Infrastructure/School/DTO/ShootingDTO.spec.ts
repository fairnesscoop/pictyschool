import { ShootingDTO } from './ShootingDTO';
import { validate } from 'class-validator';

describe('ShootingDTO', () => {
  it('testValidDTO', async () => {
    const dto = new ShootingDTO();
    dto.shootingDate = '2019-12-19T11:20:04.568Z';
    dto.groupClosingDate = '2019-12-20T11:20:04.568Z';
    dto.individualClosingDate = '2020-12-20T11:20:04.568Z';
    dto.name = 'Prise de vue fin année';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testEmptyDTO', async () => {
    const dto = new ShootingDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(4);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'name should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isDateString: 'shootingDate must be a ISOString',
      isNotEmpty: 'shootingDate should not be empty'
    });
    expect(validation[2].constraints).toMatchObject({
      dateGreaterOrEqualThan: 'groupClosingDate should be greater or equal than shootingDate',
      isDateString: 'groupClosingDate must be a ISOString',
      isNotEmpty: 'groupClosingDate should not be empty'
    });
    expect(validation[3].constraints).toMatchObject({
      dateGreaterOrEqualThan: 'individualClosingDate should be greater or equal than groupClosingDate',
      isDateString: 'individualClosingDate must be a ISOString',
      isNotEmpty: 'individualClosingDate should not be empty'
    });
  });
});
