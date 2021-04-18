import { IQuery } from 'src/Application/IQuery';

export class GetShootingsBySchoolQuery implements IQuery {
  constructor(public readonly schoolId: string) {}
}
