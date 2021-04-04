import { IQuery } from 'src/Application/IQuery';

export class GetUserByEmailQuery implements IQuery {
  constructor(public readonly email: string) {}
}
