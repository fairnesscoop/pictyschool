import { ICommand } from 'src/Application/ICommand';
import { Photographer } from 'src/Domain/User/Photographer.entity';

export class UpdateProfileCommand implements ICommand {
  constructor(
    public readonly photographer: Photographer,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password?: string
  ) {}
}
