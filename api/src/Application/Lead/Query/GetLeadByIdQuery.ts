import { IQuery } from 'src/Application/IQuery';

export class GetLeadByIdQuery implements IQuery {
  constructor(
    public readonly id: string
  ) {}
}
