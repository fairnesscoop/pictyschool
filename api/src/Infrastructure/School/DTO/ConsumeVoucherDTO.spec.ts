import { ConsumeVoucherDTO } from './ConsumeVoucherDTO';
import { validate } from 'class-validator';

describe('ConsumeVoucherDTO', () => {
  it('testValidDTO', async () => {
    const dto = new ConsumeVoucherDTO();

    dto.firstName = 'Mathieu';
    dto.lastName = 'MARCHOIS';
    dto.password = 'password';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new ConsumeVoucherDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(3);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'firstName should not be empty'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'lastName should not be empty'
    });
    expect(validation[2].constraints).toMatchObject({
      isNotEmpty: 'password should not be empty'
    });
  });
});
