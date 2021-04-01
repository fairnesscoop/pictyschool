import { IQuery } from 'src/Application/IQuery';

export class GetSchoolUsersQuery implements IQuery {
  constructor(
    public readonly schoolId: string
  ) {}
}
