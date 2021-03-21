import { ProductSummaryView } from 'src/Application/Product/View/ProductSummaryView';

export class SchoolProductView {
  constructor(
    public readonly id: string,
    public readonly parentUnitPrice: number,
    public readonly photographerUnitPrice: number,
    public readonly product: ProductSummaryView
  ) {}
}
