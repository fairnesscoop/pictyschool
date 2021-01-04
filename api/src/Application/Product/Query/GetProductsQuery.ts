import { IQuery } from 'src/Application/IQuery';

export class GetProductsQuery implements IQuery {
  constructor(
    public readonly page: number
  ) {}
}
