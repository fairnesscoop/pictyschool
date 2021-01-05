import { IQuery } from 'src/Application/IQuery';

export class GetProductByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
