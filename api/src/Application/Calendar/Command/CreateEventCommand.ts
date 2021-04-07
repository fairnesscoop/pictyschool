import { ICommand } from 'src/Application/ICommand';

export class CreateEventCommand implements ICommand {
  constructor(
    public readonly fromDate: Date,
    public readonly toDate: Date,
    public readonly userId: string,
    public readonly schoolId: string,
    public readonly summary?: string
  ) {}
}
