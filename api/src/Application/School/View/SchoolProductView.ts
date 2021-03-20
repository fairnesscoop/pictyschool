import { ProductSummaryView } from 'src/Application/Product/View/ProductSummaryView';

export class SchoolProductView {
  constructor(
    public readonly id: string,
    public readonly parentUnitPrice: number,
    public readonly userUnitPrice: number,
    public readonly product: ProductSummaryView
  ) {}
}
