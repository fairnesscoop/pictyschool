import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CountDiscountsBySchoolQuery } from './CountDiscountsBySchoolQuery';
import { IDiscountRepository } from 'src/Domain/School/Repository/IDiscountRepository';

@QueryHandler(CountDiscountsBySchoolQuery)
export class CountDiscountsBySchoolQueryHandler {
  constructor(
    @Inject('IDiscountRepository')
    private readonly discountRepository: IDiscountRepository
  ) {}

  public execute({ schoolId }: CountDiscountsBySchoolQuery): Promise<number> {
    return this.discountRepository.countBySchool(schoolId);
  }
}
