import { ShippingCost } from '../ShippingCost.entity';

export interface IShippingCostRepository {
  save(shippingcost: ShippingCost): Promise<ShippingCost>;
  remove(shippingcost: ShippingCost): void;
  findOneByWeight(weight: number): Promise<ShippingCost | undefined>;
  findShippingCosts(): Promise<ShippingCost[]>;
  findOneById(id: string): Promise<ShippingCost | undefined>;
}
