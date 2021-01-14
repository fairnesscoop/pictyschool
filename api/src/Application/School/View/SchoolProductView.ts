import { ProductSummaryView } from 'src/Application/Product/View/ProductSummaryView';

export class SchoolProductView {
  constructor(
    public readonly id: string,
    public readonly unitPrice: number,
    public readonly product: ProductSummaryView
  ) {}
}
