export class ProductView {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly unitPrice: number,
    public readonly description?: string
  ) {}
}
