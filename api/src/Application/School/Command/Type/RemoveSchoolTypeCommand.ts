import { ICommand } from 'src/Application/ICommand';

export class RemoveSchoolTypeCommand implements ICommand {
  constructor(public readonly id: string) {}
}
