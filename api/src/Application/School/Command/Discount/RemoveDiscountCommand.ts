import { ICommand } from 'src/Application/ICommand';

export class RemoveDiscountCommand implements ICommand {
  constructor(public readonly id: string) {}
}
