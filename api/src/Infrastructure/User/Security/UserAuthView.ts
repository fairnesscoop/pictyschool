import { UserRole } from 'src/Domain/User/User.entity';

export class UserAuthView {
  constructor(
    public readonly id: string,
    public readonly role: UserRole
  ) {}
}