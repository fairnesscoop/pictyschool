import { ICommand } from 'src/Application/ICommand';
import { DiscountType } from 'src/Domain/School/Discount.entity';

export class CreateDiscountCommand implements ICommand {
  constructor(
    public readonly type: DiscountType,
    public readonly amount: number,
    public readonly value: number,
    public readonly schoolId: string
  ) {}
}
