import { ICommand } from 'src/Application/ICommand';

export class UpdateShootingCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly shootingDate: Date,
    public readonly closingDate: Date,
    public readonly notice: string,
  ) { }
}
