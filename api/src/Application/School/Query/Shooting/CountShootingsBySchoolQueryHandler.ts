import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CountShootingsBySchoolQuery } from './CountShootingsBySchoolQuery';
import { IShootingRepository } from 'src/Domain/School/Repository/IShootingRepository';

@QueryHandler(CountShootingsBySchoolQuery)
export class CountShootingsBySchoolQueryHandler {
  constructor(
    @Inject('IShootingRepository')
    private readonly shootingRepository: IShootingRepository
  ) {}

  public execute({ schoolId }: CountShootingsBySchoolQuery): Promise<number> {
    return this.shootingRepository.countBySchool(schoolId);
  }
}
