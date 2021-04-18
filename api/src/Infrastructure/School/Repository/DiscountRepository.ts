import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from 'src/Domain/School/Discount.entity';
import { IDiscountRepository } from 'src/Domain/School/Repository/IDiscountRepository';
import { School } from 'src/Domain/School/School.entity';

@Injectable()
export class DiscountRepository implements IDiscountRepository {
  constructor(
    @InjectRepository(Discount)
    private readonly repository: Repository<Discount>
  ) {}

  public save(discount: Discount): Promise<Discount> {
    return this.repository.save(discount);
  }

  public findOneByAmountAndSchool(amount: number, school: School): Promise<Discount | undefined> {
    return this.repository
      .createQueryBuilder('discount')
      .select(['discount.id'])
      .innerJoin('discount.school', 'school', 'school.id = :school', {
        school: school.getId()
      })
      .where('discount.amount = :amount', { amount })
      .getOne();
  }

  public findBySchool(schoolId: string): Promise<Discount[]> {
    return this.repository
      .createQueryBuilder('discount')
      .select([
        'discount.id',
        'discount.type',
        'discount.amount',
        'discount.value',
      ])
      .innerJoin('discount.school', 'school', 'school.id = :schoolId', { schoolId })
      .orderBy('discount.amount', 'ASC')
      .getMany();
  }

  public countBySchool(id: string): Promise<number> {
    return this.repository
      .createQueryBuilder('discount')
      .select('discount.id')
      .innerJoin('discount.school', 'school', 'school.id = :id', { id })
      .getCount();
  }
}
