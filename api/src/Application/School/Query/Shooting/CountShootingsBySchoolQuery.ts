import { IQuery } from 'src/Application/IQuery';

export class CountShootingsBySchoolQuery implements IQuery {
  constructor(public readonly schoolId: string) {}
}
