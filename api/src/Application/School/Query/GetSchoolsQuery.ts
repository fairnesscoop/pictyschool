import { IQuery } from 'src/Application/IQuery';

export class GetSchoolsQuery implements IQuery {
  constructor(
    public readonly page: number
  ) {}
}
