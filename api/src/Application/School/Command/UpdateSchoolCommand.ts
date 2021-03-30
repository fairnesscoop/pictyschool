import { ICommand } from 'src/Application/ICommand';
import { Status, Type } from 'src/Domain/School/AbstractSchool';

export class UpdateSchoolCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly reference: string,
    public readonly name: string,
    public readonly address: string,
    public readonly zipCode: string,
    public readonly city: string,
    public readonly status: Status,
    public readonly type: Type,
    public readonly phoneNumber?: string,
    public readonly numberOfStudents?: number,
    public readonly numberOfClasses?: number,
    public readonly observation?: string,
    public readonly pdv?: string
  ) {}
}
