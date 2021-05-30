import { IQuery } from 'src/Application/IQuery';

export class GetShippingCostByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
