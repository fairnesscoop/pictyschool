import { IQuery } from 'src/Application/IQuery';
import { UserRole } from 'src/Domain/User/User.entity';

export class GetUsersByRoleQuery implements IQuery {
  constructor(public readonly role: UserRole) {}
}
