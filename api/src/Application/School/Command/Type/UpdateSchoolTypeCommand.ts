import { ICommand } from 'src/Application/ICommand';

export class UpdateSchoolTypeCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly name: string
  ) {}
}
