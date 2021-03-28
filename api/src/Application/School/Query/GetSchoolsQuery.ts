import { IQuery } from 'src/Application/IQuery';
import { UserRole } from 'src/Domain/User/User.entity';

export class GetSchoolsQuery implements IQuery {
  constructor(
    public readonly page: number,
    public readonly userId: string,
    public readonly userRole: UserRole,
  ) {}
}
