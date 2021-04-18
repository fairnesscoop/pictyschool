import { Discount } from '../Discount.entity';
import { School } from '../School.entity';

export interface IDiscountRepository {
  save(discount: Discount): Promise<Discount>;
  findOneByAmountAndSchool(amount: number, school: School): Promise<Discount | undefined>;
  findBySchool(schoolId: string): Promise<Discount[]>;
  countBySchool(id: string): Promise<number>;
}
