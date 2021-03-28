import { UserIdDTO } from './UserIdDTO';
import { validate } from 'class-validator';

describe('UserIdDTO', () => {
  it('testValidDTO', async () => {
    const dto = new UserIdDTO();
    dto.userId = 'ff623892-434b-4f2d-945e-775c87bae2ac';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new UserIdDTO();
    dto.userId = '25';

    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
    expect(validation[0].constraints).toMatchObject({
      isUuid: 'userId must be an UUID'
    });
  });

  it('testEmptyDTO', async () => {
    const dto = new UserIdDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'userId should not be empty'
    });
  });
});
