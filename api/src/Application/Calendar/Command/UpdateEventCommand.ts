import { ICommand } from 'src/Application/ICommand';

export class UpdateEventCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly date: Date,
    public readonly userId: string,
    public readonly schoolId: string,
    public readonly summary?: string
  ) {}
}
