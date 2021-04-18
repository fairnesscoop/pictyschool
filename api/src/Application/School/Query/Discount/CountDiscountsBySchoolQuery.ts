import { IQuery } from 'src/Application/IQuery';

export class CountDiscountsBySchoolQuery implements IQuery {
  constructor(public readonly schoolId: string) {}
}
