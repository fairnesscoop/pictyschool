import { ICommand } from 'src/Application/ICommand';

export class UpdateShippingCostCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly grams: number,
    public readonly price: number
  ) {}
}
