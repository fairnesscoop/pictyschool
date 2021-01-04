import { ICommand } from 'src/Application/ICommand';

export class CreateProductCommand implements ICommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly unitPrice: number
  ) {}
}
