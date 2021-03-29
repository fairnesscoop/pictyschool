import { IQuery } from 'src/Application/IQuery';

export class GetLeadsQuery implements IQuery {
  constructor(
    public readonly page: number,
  ) {}
}
