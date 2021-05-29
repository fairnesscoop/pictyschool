import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShippingCost } from 'src/Domain/Order/ShippingCost.entity';
import { IShippingCostRepository } from 'src/Domain/Order/Repository/IShippingCostRepository';

@Injectable()
export class ShippingCostRepository implements IShippingCostRepository {
  constructor(
    @InjectRepository(ShippingCost)
    private readonly repository: Repository<ShippingCost>
  ) {}

  public save(shippingCost: ShippingCost): Promise<ShippingCost> {
    return this.repository.save(shippingCost);
  }
}
