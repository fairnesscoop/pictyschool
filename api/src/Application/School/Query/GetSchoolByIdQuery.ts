import { IQuery } from 'src/Application/IQuery';

export class GetSchoolByIdQuery implements IQuery {
  constructor(
    public readonly id: string,
    public readonly userId: string
  ) {}
}
