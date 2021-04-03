import { IQuery } from 'src/Application/IQuery';

export class GetSchoolVouchersQuery implements IQuery {
  constructor(
    public readonly schoolId: string
  ) {}
}
