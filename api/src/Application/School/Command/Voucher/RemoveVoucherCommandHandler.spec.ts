import { mock, instance, when, verify, anything } from 'ts-mockito';
import { VoucherRepository } from 'src/Infrastructure/School/Repository/VoucherRepository';
import { Voucher } from 'src/Domain/School/Voucher.entity';
import { RemoveVoucherCommandHandler } from './RemoveVoucherCommandHandler';
import { RemoveVoucherCommand } from './RemoveVoucherCommand';
import { VoucherNotFoundException } from 'src/Domain/School/Exception/VoucherNotFoundException';

describe('RemoveVoucherCommandHandler', () => {
  let voucherRepository: VoucherRepository;
  let removedVoucher: Voucher;
  let handler: RemoveVoucherCommandHandler;

  const command = new RemoveVoucherCommand('17efcbee-bd2f-410e-9e99-51684b592bad');

  beforeEach(() => {
    voucherRepository = mock(VoucherRepository);
    removedVoucher = mock(Voucher);

    handler = new RemoveVoucherCommandHandler(
      instance(voucherRepository)
    );
  });

  it('testVoucherRemovedSuccessfully', async () => {
    when(voucherRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(instance(removedVoucher));
    when(removedVoucher.getId()).thenReturn(
      '17efcbee-bd2f-410e-9e99-51684b592bad'
    );
    when(
      voucherRepository.save(instance(removedVoucher))
    ).thenResolve(instance(removedVoucher));

    await handler.execute(command);

    verify(
      voucherRepository.remove(instance(removedVoucher))
    ).once();
    verify(voucherRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
  });

  it('testVoucherNotFound', async () => {
    when(voucherRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(VoucherNotFoundException);
      expect(e.message).toBe('schools.errors.voucher_not_found');
      verify(voucherRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
      verify(voucherRepository.remove(anything())).never();
    }
  });
});
