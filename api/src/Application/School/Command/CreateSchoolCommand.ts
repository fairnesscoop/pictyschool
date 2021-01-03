import { ICommand } from 'src/Application/ICommand';
import { Photographer } from 'src/Domain/User/Photographer.entity';

export class CreateSchoolCommand implements ICommand {
  constructor(
    public readonly reference: string,
    public readonly name: string,
    public readonly address: string,
    public readonly zipCode: string,
    public readonly city: string,
    public readonly photographer: Photographer
  ) {}
}
