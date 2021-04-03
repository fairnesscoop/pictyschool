import { EmailDTO } from './EmailDTO';
import { validate } from 'class-validator';

describe('EmailDTO', () => {
  it('testValidDTO', async () => {
    const dto = new EmailDTO();
    dto.email = 'mathieu.marchois@gmail.com';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new EmailDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(1);
    expect(validation[0].constraints).toMatchObject({
      isEmail: 'email must be an email'
    });
  });
});
