import { Voucher } from 'src/Domain/School/Voucher.entity';
import { VoucherRepository } from 'src/Infrastructure/School/Repository/VoucherRepository';
import { mock, instance, when, verify } from 'ts-mockito';
import { SchoolUserView } from '../../View/SchoolUserView';
import { GetSchoolVouchersQuery } from './GetSchoolVouchersQuery';
import { GetSchoolVouchersQueryHandler } from './GetSchoolVouchersQueryHandler';

describe('GetSchoolVouchersQueryHandler', () => {
  it('testGetSchoolVouchers', async () => {
    const voucherRepository = mock(VoucherRepository);

    const voucher1 = mock(Voucher);
    when(voucher1.getEmail()).thenReturn('mathieu@fairness.coop');
    when(voucher1.getId()).thenReturn('4de2ffc4-e835-44c8-95b7-17c171c09873');

    when(
      voucherRepository.findBySchool('5eb3173b-97ab-4bbc-b31c-878d4bfafbc1')
    ).thenResolve([instance(voucher1)]);

    const queryHandler = new GetSchoolVouchersQueryHandler(
      instance(voucherRepository)
    );

    const expectedResult = [
      new SchoolUserView(
        '4de2ffc4-e835-44c8-95b7-17c171c09873',
        'mathieu@fairness.coop',
        'voucher'
      )
    ];

    expect(
      await queryHandler.execute(
        new GetSchoolVouchersQuery('5eb3173b-97ab-4bbc-b31c-878d4bfafbc1')
      )
    ).toMatchObject(expectedResult);
    verify(
      voucherRepository.findBySchool('5eb3173b-97ab-4bbc-b31c-878d4bfafbc1')
    ).once();
  });
});
