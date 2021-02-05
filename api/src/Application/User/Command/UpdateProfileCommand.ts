import { ICommand } from 'src/Application/ICommand';

export class UpdateProfileCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password?: string
  ) {}
}
