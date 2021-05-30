import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetShootingsBySchoolQuery } from './GetShootingsBySchoolQuery';
import { IShootingRepository } from 'src/Domain/School/Repository/IShootingRepository';
import { ShootingSummaryView } from '../../View/ShootingSummaryView';

@QueryHandler(GetShootingsBySchoolQuery)
export class GetShootingsBySchoolQueryHandler {
  constructor(
    @Inject('IShootingRepository')
    private readonly shootingRepository: IShootingRepository
  ) {}

  public async execute({ schoolId }: GetShootingsBySchoolQuery): Promise<ShootingSummaryView[]> {
    const shootingViews: ShootingSummaryView[] = [];
    const shootings = await this.shootingRepository.findBySchool(
      schoolId
    );

    for (const shooting of shootings) {
      shootingViews.push(
        new ShootingSummaryView(
          shooting.getId(),
          shooting.getName(),
          shooting.getStatus(),
          shooting.getShootingDate()
        )
      );
    }

    return shootingViews;
  }
}
