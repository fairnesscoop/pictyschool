import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSchoolsQuery } from './GetSchoolsQuery';
import { Pagination } from 'src/Application/Common/Pagination';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { SchoolView } from '../View/SchoolView';
import { UserRole } from 'src/Domain/User/User.entity';

@QueryHandler(GetSchoolsQuery)
export class GetSchoolsQueryHandler {
  constructor(
    @Inject('ISchoolRepository')
    private readonly schoolRepository: ISchoolRepository
  ) {}

  public async execute(
    query: GetSchoolsQuery
  ): Promise<Pagination<SchoolView>> {
    const { page, userId, userRole } = query;
    const directorIdFilter = userRole === UserRole.PHOTOGRAPHER ? null : userId;
    const schoolViews: SchoolView[] = [];
    const [ schools, total ] = await this.schoolRepository.findSchools(
      page, directorIdFilter
    );

    for (const school of schools) {
      schoolViews.push(
        new SchoolView(
          school.getId(),
          school.getName(),
          school.getReference(),
          school.getAddress(),
          school.getCity(),
          school.getZipCode(),
          school.getStatus(),
          school.getType()
        )
      );
    }

    return new Pagination<SchoolView>(schoolViews, total);
  }
}
