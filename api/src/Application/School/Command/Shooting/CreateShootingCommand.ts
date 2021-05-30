import { ICommand } from 'src/Application/ICommand';

export class CreateShootingCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly shootingDate: Date,
    public readonly groupClosingDate: Date,
    public readonly individualClosingDate: Date,
    public readonly schoolId: string,
    public readonly notice: string,
  ) {}
}
