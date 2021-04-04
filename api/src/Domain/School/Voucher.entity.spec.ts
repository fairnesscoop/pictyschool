import { mock, instance } from 'ts-mockito';
import { Voucher } from './Voucher.entity';
import { School } from './School.entity';

describe('Voucher.entity', () => {
  it('testGetters', () => {
    const school = mock(School);
    const voucher = new Voucher(
      'x78hsKj',
      'mathieu.marchois@gmail.com',
      instance(school)
    );

    expect(voucher.getId()).toBeUndefined();
    expect(voucher.getEmail()).toBe('mathieu.marchois@gmail.com');
    expect(voucher.getCode()).toBe('x78hsKj');
    expect(voucher.getSchool()).toBe(instance(school));
    expect(voucher.getCreatedAt()).toBeUndefined();
  });
});
