import { ICommand } from 'src/Application/ICommand';

export class UpdateProductCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly unitPrice: number,
    public readonly weight: number,
    public readonly description?: string
  ) {}
}
