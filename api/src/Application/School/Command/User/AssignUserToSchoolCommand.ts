import { ICommand } from 'src/Application/ICommand';

export class AssignUserToSchoolCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly schoolId: string
  ) {}
}
