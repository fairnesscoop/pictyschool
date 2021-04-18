import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDiscountsBySchoolQuery } from './GetDiscountsBySchoolQuery';
import { IDiscountRepository } from 'src/Domain/School/Repository/IDiscountRepository';
import { DiscountView } from '../../View/DiscountView';

@QueryHandler(GetDiscountsBySchoolQuery)
export class GetDiscountsBySchoolQueryHandler {
  constructor(
    @Inject('IDiscountRepository')
    private readonly discountRepository: IDiscountRepository
  ) {}

  public async execute({ schoolId }: GetDiscountsBySchoolQuery): Promise<DiscountView[]> {
    const discountViews: DiscountView[] = [];
    const discounts = await this.discountRepository.findBySchool(
      schoolId
    );

    for (const discount of discounts) {
      discountViews.push(
        new DiscountView(
          discount.getId(),
          discount.getType(),
          discount.getAmount() / 100,
          discount.getValue() / 100
        )
      );
    }

    return discountViews;
  }
}
