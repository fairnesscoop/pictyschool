import { ICommand } from 'src/Application/ICommand';

export class RemoveVoucherCommand implements ICommand {
  constructor(public readonly id: string) {}
}
