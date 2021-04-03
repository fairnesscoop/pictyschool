import { ICommand } from 'src/Application/ICommand';

export class CreateVoucherCommand implements ICommand {
  constructor(
    public readonly schoolId: string,
    public readonly email: string
  ) {}
}
