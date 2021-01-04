import { IQuery } from 'src/Application/IQuery';

export class GetPhotographerByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
