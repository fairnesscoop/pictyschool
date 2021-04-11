import { EventPeriodDTO } from './EventPeriodDTO';
import { validate } from 'class-validator';

describe('EventPeriodDTO', () => {
  it('testValidDTO', async () => {
    const dto = new EventPeriodDTO();
    dto.fromDate = '2019-12-19T11:20:04.568Z';
    dto.toDate = '2019-12-20T11:20:04.568Z';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testEmptyDTO', async () => {
    const dto = new EventPeriodDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(2);
    expect(validation[0].constraints).toMatchObject({
      isDateString: 'fromDate must be a ISOString',
      isNotEmpty: 'fromDate should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      dateGreaterOrEqualThan: 'toDate should be greater or equal than fromDate',
      isDateString: 'toDate must be a ISOString',
      isNotEmpty: 'toDate should not be empty'
    });
  });
});
