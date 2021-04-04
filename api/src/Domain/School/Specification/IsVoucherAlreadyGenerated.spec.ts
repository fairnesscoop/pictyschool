import { mock, instance, when, verify, anything } from 'ts-mockito';
import { VoucherRepository } from 'src/Infrastructure/School/Repository/VoucherRepository';
import { Voucher } from 'src/Domain/School/Voucher.entity';
import { IsVoucherAlreadyGenerated } from './IsVoucherAlreadyGenerated';
import { School } from '../School.entity';

describe('IsVoucherAlreadyExist', () => {
  let voucherRepository: VoucherRepository;
  let isVoucherAlreadyExist: IsVoucherAlreadyGenerated;
  const school = mock(School);

  beforeEach(() => {
    voucherRepository = mock(VoucherRepository);
    isVoucherAlreadyExist = new IsVoucherAlreadyGenerated(
      instance(voucherRepository)
    );
  });

  it('testVoucherAlreadyExist', async () => {
    when(voucherRepository.findOneByEmailAndSchool('mathieu@fairness.coop', instance(school))).thenResolve(
      new Voucher(
        anything(),
        anything(),
        anything()
      )
    );
    expect(await isVoucherAlreadyExist.isSatisfiedBy('mathieu@fairness.coop', instance(school))).toBe(
      true
    );
    verify(voucherRepository.findOneByEmailAndSchool('mathieu@fairness.coop', instance(school))).once();
  });

  it('testVoucherDontExist', async () => {
    when(voucherRepository.findOneByEmailAndSchool('mathieu@fairness.coop', instance(school))).thenResolve(null);
    expect(await isVoucherAlreadyExist.isSatisfiedBy('mathieu@fairness.coop', instance(school))).toBe(
      false
    );
    verify(voucherRepository.findOneByEmailAndSchool('mathieu@fairness.coop', instance(school))).once();
  });
});
