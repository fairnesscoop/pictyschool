import { IQuery } from 'src/Application/IQuery';

export class PhotographerLoginQuery implements IQuery {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}
}
