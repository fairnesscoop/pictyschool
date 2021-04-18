import { ICommand } from 'src/Application/ICommand';

export class CreateShootingCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly shootingDate: Date,
    public readonly closingDate: Date,
    public readonly schoolId: string
  ) {}
}
