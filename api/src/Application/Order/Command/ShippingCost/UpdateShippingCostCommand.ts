import { ICommand } from 'src/Application/ICommand';

export class UpdateShippingCostCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly weight: number,
    public readonly price: number
  ) {}
}
