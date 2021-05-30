import { ShippingCost } from '../ShippingCost.entity';

export interface IShippingCostRepository {
  save(shippingcost: ShippingCost): Promise<ShippingCost>;
  findOneByGrams(grams: number): Promise<ShippingCost | undefined>;
  findShippingCosts(): Promise<ShippingCost[]>;
  findOneById(id: string): Promise<ShippingCost | undefined>;
}
