import { Status, Type } from 'src/Domain/School/AbstractSchool';

export class SchoolView {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly reference: string,
    public readonly address: string,
    public readonly city: string,
    public readonly zipCode: string,
    public readonly status: Status,
    public readonly type: Type,
  ) {}
}
