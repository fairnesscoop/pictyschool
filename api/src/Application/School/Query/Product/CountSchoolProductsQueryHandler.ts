import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CountSchoolProductsQuery } from './CountSchoolProductsQuery';
import { ISchoolProductRepository } from 'src/Domain/School/Repository/ISchoolProductRepository';

@QueryHandler(CountSchoolProductsQuery)
export class CountSchoolProductsQueryHandler {
  constructor(
    @Inject('ISchoolProductRepository')
    private readonly schoolProductRepository: ISchoolProductRepository
  ) {}

  public execute({ schoolId }: CountSchoolProductsQuery): Promise<number> {
    return this.schoolProductRepository.countBySchoolId(schoolId);
  }
}
