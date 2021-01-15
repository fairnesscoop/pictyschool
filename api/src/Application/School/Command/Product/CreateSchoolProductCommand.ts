import { ICommand } from 'src/Application/ICommand';

export class CreateSchoolProductCommand implements ICommand {
  constructor(
    public readonly unitPrice: number,
    public readonly schoolId: string,
    public readonly productId: string
  ) {}
}
