import { ICommand } from 'src/Application/ICommand';

export class RemoveProductCommand implements ICommand {
  constructor(public readonly id: string) {}
}
