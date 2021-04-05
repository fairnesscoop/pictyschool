import { IQuery } from 'src/Application/IQuery';

export class GetVoucherByCodeQuery implements IQuery {
  constructor(public readonly code: string) {}
}
