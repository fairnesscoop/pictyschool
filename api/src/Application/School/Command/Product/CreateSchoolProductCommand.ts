import { ICommand } from 'src/Application/ICommand';

export class CreateSchoolProductCommand implements ICommand {
  constructor(
    public readonly parentUnitPrice: number,
    public readonly photographerUnitPrice: number,
    public readonly schoolId: string,
    public readonly productId: string
  ) {}
}
