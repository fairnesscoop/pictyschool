import { ICommand } from 'src/Application/ICommand';

export class UpdateShootingCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly shootingDate: Date,
    public readonly groupClosingDate: Date,
    public readonly individualClosingDate: Date,
    public readonly notice: string,
  ) { }
}
