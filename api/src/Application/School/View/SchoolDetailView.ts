import { Civility } from 'src/Domain/School/School.entity';
import { SchoolTypeView } from './SchoolTypeView';

export class SchoolDetailView {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly reference: string,
    public readonly address: string,
    public readonly city: string,
    public readonly zipCode: string,
    public readonly phoneNumber?: string,
    public readonly email?: string,
    public readonly director?: string,
    public readonly directorCivility?: Civility,
    public readonly numberOfClasses?: number,
    public readonly numberOfStudents?: number,
    public readonly pdv?: string,
    public readonly observation?: string,
    public readonly schoolType?: SchoolTypeView
  ) {}
}
