import { VoucherNotFoundException } from 'src/Domain/School/Exception/VoucherNotFoundException';
import { School } from 'src/Domain/School/School.entity';
import { Voucher } from 'src/Domain/School/Voucher.entity';
import { VoucherRepository } from 'src/Infrastructure/School/Repository/VoucherRepository';
import { mock, instance, when, verify } from 'ts-mockito';
import { VoucherView } from '../../View/VoucherView';
import { GetVoucherByCodeQuery } from './GetVoucherByCodeQuery';
import { GetVoucherByCodeQueryHandler } from './GetVoucherByCodeQueryHandler';

describe('GetVoucherByCodeQueryHandler', () => {
  const query = new GetVoucherByCodeQuery('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');

  it('testGetVoucher', async () => {
    const voucherRepository = mock(VoucherRepository);
    const queryHandler = new GetVoucherByCodeQueryHandler(instance(voucherRepository));
    const expectedResult = new VoucherView(
      'eb9e1d9b-dce2-48a9-B64F-f0872f3157d2',
      'xLKJS',
      'mathieu@fairness.coop',
      'ee18bf86-c72a-4ed9-a6d1-212f4286759e'
    );

    const school = mock(School);
    when(school.getId()).thenReturn('ee18bf86-c72a-4ed9-a6d1-212f4286759e');

    const voucher = mock(Voucher);
    when(voucher.getId()).thenReturn('eb9e1d9b-dce2-48a9-B64F-f0872f3157d2');
    when(voucher.getCode()).thenReturn('xLKJS');
    when(voucher.getEmail()).thenReturn('mathieu@fairness.coop');
    when(voucher.getSchool()).thenReturn(instance(school));
    when(
      voucherRepository.findOneByCode('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(voucher));

    expect(await queryHandler.execute(query)).toMatchObject(expectedResult);

    verify(
      voucherRepository.findOneByCode('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
  });

  it('testGetVoucherNotFound', async () => {
    const voucherRepository = mock(VoucherRepository);
    const queryHandler = new GetVoucherByCodeQueryHandler(instance(voucherRepository));
    when(
      voucherRepository.findOneByCode('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(null);

    try {
      expect(await queryHandler.execute(query)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(VoucherNotFoundException);
      expect(e.message).toBe('schools.errors.voucher_not_found');
      verify(
        voucherRepository.findOneByCode('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
    }
  });
});
