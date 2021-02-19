import { ICommand } from 'src/Application/ICommand';
import { Civility } from 'src/Domain/School/School.entity';

export class UpdateSchoolCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly reference: string,
    public readonly name: string,
    public readonly address: string,
    public readonly zipCode: string,
    public readonly city: string,
    public readonly schoolTypeId: string,
    public readonly phoneNumber?: string,
    public readonly director?: string,
    public readonly directorCivility?: Civility,
    public readonly email?: string,
    public readonly numberOfStudents?: number,
    public readonly numberOfClasses?: number,
    public readonly observation?: string,
    public readonly pdv?: string
  ) {}
}
