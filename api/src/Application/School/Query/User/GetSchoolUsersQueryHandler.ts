import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSchoolUsersQuery } from './GetSchoolUsersQuery';
import { ISchoolUserRepository } from 'src/Domain/School/Repository/ISchoolUserRepository';
import { SchoolUserView } from 'src/Application/School/View/SchoolUserView';

@QueryHandler(GetSchoolUsersQuery)
export class GetSchoolUsersQueryHandler {
  constructor(
    @Inject('ISchoolUserRepository')
    private readonly schoolUserRepository: ISchoolUserRepository
  ) {}

  public async execute(query: GetSchoolUsersQuery): Promise<SchoolUserView[]> {
    const schoolUserViews: SchoolUserView[] = [];
    const schoolUsers = await this.schoolUserRepository.findUsersBySchool(query.schoolId);

    for (const schoolUser of schoolUsers) {
      const user = schoolUser.getUser();

      schoolUserViews.push(
        new SchoolUserView(
          schoolUser.getId(),
          user.getEmail(),
          'schoolUser'
        )
      );
    }

    return schoolUserViews;
  }
}
