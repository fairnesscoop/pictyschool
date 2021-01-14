import { IQuery } from 'src/Application/IQuery';

export class GetSchoolProductByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
