import { School } from '../School.entity';
import { Voucher } from '../Voucher.entity';

export interface IVoucherRepository {
  save(voucher: Voucher): Promise<Voucher>;
  remove(voucher: Voucher): void;
  findOneByEmailAndSchool(email: string, school: School): Promise<Voucher | undefined>;
  findOneById(id: string): Promise<Voucher | undefined>;
  findBySchool(schoolId: string): Promise<Voucher[]>;
}
