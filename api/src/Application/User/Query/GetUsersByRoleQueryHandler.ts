import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetUsersByRoleQuery } from './GetUsersByRoleQuery';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { UserSummaryView } from '../View/UserSummaryView';

@QueryHandler(GetUsersByRoleQuery)
export class GetUsersByRoleQueryHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  public async execute({ role }: GetUsersByRoleQuery): Promise<UserSummaryView[]> {
    const users = await this.userRepository.findUsersByRole(role);
    const userViews: UserSummaryView[] = [];

    for (const user of users) {
      userViews.push(
        new UserSummaryView(
          user.getId(),
          user.getFirstName(),
          user.getLastName(),
          user.getEmail(),
        )
      );
    }

    return userViews;
  }
}
