import { Status, Type } from 'src/Domain/School/AbstractSchool';

export class LeadView {
  constructor(
    public readonly id: string,
    public readonly reference: string,
    public readonly name: string,
    public readonly address: string,
    public readonly zipCode: string,
    public readonly city: string,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly status: Status,
    public readonly type: Type,
    public readonly numberOfStudents?: number,
  ) {}
}
