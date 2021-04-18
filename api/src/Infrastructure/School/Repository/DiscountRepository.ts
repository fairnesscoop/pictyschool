import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from 'src/Domain/School/Discount.entity';
import { IDiscountRepository } from 'src/Domain/School/Repository/IDiscountRepository';

@Injectable()
export class DiscountRepository implements IDiscountRepository {
  constructor(
    @InjectRepository(Discount)
    private readonly repository: Repository<Discount>
  ) {}

  public save(discount: Discount): Promise<Discount> {
    return this.repository.save(discount);
  }
}
