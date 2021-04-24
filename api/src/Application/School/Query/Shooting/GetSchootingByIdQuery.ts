import { IQuery } from 'src/Application/IQuery';

export class GetShootingByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
