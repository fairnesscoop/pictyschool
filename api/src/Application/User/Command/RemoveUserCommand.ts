import { ICommand } from 'src/Application/ICommand';

export class RemoveUserCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly currentUserId: string
  ) {}
}
