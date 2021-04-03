import { ICommand } from 'src/Application/ICommand';
import { User } from 'src/Domain/User/User.entity';

export class AddUserToSchoolCommand implements ICommand {
  constructor(
    public readonly user: User,
    public readonly schoolId: string
  ) {}
}
