import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSchoolUsersQuery } from './GetSchoolUsersQuery';
import { ISchoolUserRepository } from 'src/Domain/School/Repository/ISchoolUserRepository';
import { UserSchoolView } from '../../View/UserSchoolView';

@QueryHandler(GetSchoolUsersQuery)
export class GetSchoolUsersQueryHandler {
  constructor(
    @Inject('ISchoolUserRepository')
    private readonly schoolUserRepository: ISchoolUserRepository
  ) {}

  public async execute(query: GetSchoolUsersQuery): Promise<UserSchoolView[]> {
    const userViews: UserSchoolView[] = [];
    const schoolUsers = await this.schoolUserRepository.findUsersBySchool(query.schoolId);

    for (const schoolUser of schoolUsers) {
      userViews.push(
        new UserSchoolView(
          schoolUser.getId(),
          schoolUser.getUser().getFirstName(),
          schoolUser.getUser().getLastName(),
          schoolUser.getUser().getEmail()
        )
      );
    }

    return userViews;
  }
}
