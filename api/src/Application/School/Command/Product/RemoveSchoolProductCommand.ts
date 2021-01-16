import { ICommand } from 'src/Application/ICommand';

export class RemoveSchoolProductCommand implements ICommand {
  constructor(public readonly id: string) {}
}
