import { IQuery } from 'src/Application/IQuery';

export class GetSchoolProductsQuery implements IQuery {
  constructor(public readonly schoolId: string) {}
}
