import { Discount } from '../Discount.entity';

export interface IDiscountRepository {
  save(discount: Discount): Promise<Discount>;
}
