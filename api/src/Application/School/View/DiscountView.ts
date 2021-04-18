import { DiscountType } from 'src/Domain/School/Discount.entity';

export class DiscountView {
  constructor(
    public readonly id: string,
    public readonly type: DiscountType,
    public readonly amount: number,
    public readonly value: number
  ) {}
}
