import { ICommand } from 'src/Application/ICommand';

export class CreateSchoolTypeCommand implements ICommand {
  constructor(public readonly name: string) {}
}
