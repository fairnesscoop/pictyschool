import { EventDTO } from './EventDTO';
import { validate } from 'class-validator';

describe('EventDTO', () => {
  it('testValidDTO', async () => {
    const dto = new EventDTO();
    dto.fromDate = '2019-12-19T11:20:04.568Z';
    dto.toDate = '2019-12-20T11:20:04.568Z';
    dto.schoolId = '2218609f-293b-4438-b3a0-cce8961e8acc';
    dto.summary = 'Summary';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testEmptyDTO', async () => {
    const dto = new EventDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(3);
    expect(validation[0].constraints).toMatchObject({
      isDateString: 'fromDate must be a ISOString',
      isNotEmpty: 'fromDate should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      dateGreaterOrEqualThan: 'toDate should be greater or equal than fromDate',
      isDateString: 'toDate must be a ISOString',
      isNotEmpty: 'toDate should not be empty'
    });
    expect(validation[2].constraints).toMatchObject({
      isNotEmpty: 'schoolId should not be empty',
      isUuid: 'schoolId must be an UUID'
    });
  });
});
