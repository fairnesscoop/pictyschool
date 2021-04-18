import { IQuery } from 'src/Application/IQuery';

export class GetDiscountsBySchoolQuery implements IQuery {
  constructor(public readonly schoolId: string) {}
}
