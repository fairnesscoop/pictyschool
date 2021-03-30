import { ICommand } from 'src/Application/ICommand';

export class RemoveLeadCommand implements ICommand {
  constructor(public readonly id: string) {}
}
