import { IQuery } from 'src/Application/IQuery';

export class CountSchoolProductsQuery implements IQuery {
  constructor(public readonly schoolId: string) {}
}
