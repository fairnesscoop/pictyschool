import { ICommand } from 'src/Application/ICommand';

export class AssignDirectorToSchoolCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly schoolId: string
  ) {}
}
