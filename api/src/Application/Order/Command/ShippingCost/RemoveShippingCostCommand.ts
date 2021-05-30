import { ICommand } from 'src/Application/ICommand';

export class RemoveShippingCostCommand implements ICommand {
  constructor(public readonly id: string) {}
}
