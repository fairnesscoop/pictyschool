import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetShootingsBySchoolQuery } from './GetShootingsBySchoolQuery';
import { IShootingRepository } from 'src/Domain/School/Repository/IShootingRepository';
import { ShootingView } from '../../View/ShootingView';

@QueryHandler(GetShootingsBySchoolQuery)
export class GetShootingsBySchoolQueryHandler {
  constructor(
    @Inject('IShootingRepository')
    private readonly shootingRepository: IShootingRepository
  ) {}

  public async execute({ schoolId }: GetShootingsBySchoolQuery): Promise<ShootingView[]> {
    const shootingViews: ShootingView[] = [];
    const shootings = await this.shootingRepository.findBySchool(
      schoolId
    );

    for (const shooting of shootings) {
      shootingViews.push(
        new ShootingView(
          shooting.getId(),
          shooting.getName(),
          shooting.getStatus(),
          shooting.getShootingDate(),
          shooting.getClosingDate(),
        )
      );
    }

    return shootingViews;
  }
}
