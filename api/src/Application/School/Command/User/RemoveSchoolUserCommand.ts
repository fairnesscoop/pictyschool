import { ICommand } from 'src/Application/ICommand';

export class RemoveSchoolUserCommand implements ICommand {
  constructor(public readonly id: string) {}
}
