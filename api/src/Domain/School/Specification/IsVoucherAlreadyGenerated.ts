import { Inject } from '@nestjs/common';
import { IVoucherRepository } from '../Repository/IVoucherRepository';
import { School } from '../School.entity';
import { Voucher } from '../Voucher.entity';

export class IsVoucherAlreadyGenerated {
  constructor(
    @Inject('IVoucherRepository')
    private readonly voucherRepository: IVoucherRepository
  ) {}

  public async isSatisfiedBy(email: string, school: School): Promise<boolean> {
    return (
      (await this.voucherRepository.findOneByEmailAndSchool(email, school)) instanceof Voucher
    );
  }
}
