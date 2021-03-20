import { ICommand } from 'src/Application/ICommand';

export class CreateSchoolCommand implements ICommand {
  constructor(
    public readonly reference: string,
    public readonly name: string,
    public readonly address: string,
    public readonly zipCode: string,
    public readonly city: string,
    public readonly schoolTypeId: string,
    public readonly phoneNumber?: string,
    public readonly numberOfStudents?: number,
    public readonly numberOfClasses?: number,
    public readonly observation?: string,
    public readonly pdv?: string
  ) {}
}
