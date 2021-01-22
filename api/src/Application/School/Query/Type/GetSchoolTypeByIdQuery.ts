import { IQuery } from 'src/Application/IQuery';

export class GetSchoolTypeByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
