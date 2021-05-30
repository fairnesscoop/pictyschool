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

  public remove(shippingCost: ShippingCost): void {
    this.repository.delete(shippingCost.getId());
  }

  public findOneByWeight(weight: number): Promise<ShippingCost | undefined> {
    return this.repository
      .createQueryBuilder('shippingCost')
      .select([ 'shippingCost.id' ])
      .where('shippingCost.weight = :weight', { weight })
      .getOne();
  }

  public findOneById(id: string): Promise<ShippingCost | undefined> {
    return this.repository
      .createQueryBuilder('shippingcost')
      .select([
        'shippingcost.id',
        'shippingcost.weight',
        'shippingcost.price'
      ])
      .where('shippingcost.id = :id', { id })
      .getOne();
  }

  public findShippingCosts(): Promise<ShippingCost[]> {
    return this.repository
      .createQueryBuilder('shippingcost')
      .select([
        'shippingcost.id',
        'shippingcost.price',
        'shippingcost.weight'
      ])
      .orderBy('shippingcost.weight', 'ASC')
      .getMany();
  }
}
