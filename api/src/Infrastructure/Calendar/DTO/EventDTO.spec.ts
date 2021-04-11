import { EventDTO } from './EventDTO';
import { validate } from 'class-validator';

describe('EventDTO', () => {
  it('testValidDTO', async () => {
    const dto = new EventDTO();
    dto.date = '2019-12-19T11:20:04.568Z';
    dto.schoolId = '2218609f-293b-4438-b3a0-cce8961e8acc';
    dto.userId = '97ef3439-8766-42da-8de2-de3c12659f33';
    dto.summary = 'Summary';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testEmptyDTO', async () => {
    const dto = new EventDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(3);
    expect(validation[0].constraints).toMatchObject({
      isDateString: 'date must be a ISOString',
      isNotEmpty: 'date should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'schoolId should not be empty',
      isUuid: 'schoolId must be an UUID'
    });
    expect(validation[2].constraints).toMatchObject({
      isNotEmpty: 'userId should not be empty',
      isUuid: 'userId must be an UUID'
    });
  });
});
