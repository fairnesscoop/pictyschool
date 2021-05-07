import { ICommand } from 'src/Application/ICommand';

export class CreateIngestionCommand implements ICommand {
  constructor(
    public readonly schoolId: string
  ) {}
}
