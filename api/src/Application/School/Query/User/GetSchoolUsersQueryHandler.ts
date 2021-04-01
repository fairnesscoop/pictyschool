import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSchoolUsersQuery } from './GetSchoolUsersQuery';
import { ISchoolUserRepository } from 'src/Domain/School/Repository/ISchoolUserRepository';
import { UserSummaryView } from 'src/Application/User/View/UserSummaryView';

@QueryHandler(GetSchoolUsersQuery)
export class GetSchoolUsersQueryHandler {
  constructor(
    @Inject('ISchoolUserRepository')
    private readonly schoolUserRepository: ISchoolUserRepository
  ) {}

  public async execute(query: GetSchoolUsersQuery): Promise<UserSummaryView[]> {
    const userViews: UserSummaryView[] = [];
    const schoolUsers = await this.schoolUserRepository.findUsersBySchool(query.schoolId);

    for (const schoolUser of schoolUsers) {
      const user = schoolUser.getUser();

      userViews.push(
        new UserSummaryView(
          user.getId(),
          user.getFirstName(),
          user.getLastName(),
          user.getEmail()
        )
      );
    }

    return userViews;
  }
}
