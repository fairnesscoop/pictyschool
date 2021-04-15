import { ICommand } from 'src/Application/ICommand';

export class RemoveEventCommand implements ICommand {
  constructor(public readonly id: string) {}
}
