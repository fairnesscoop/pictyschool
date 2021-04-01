import { Inject } from '@nestjs/common';
import { ISchoolUserRepository } from 'src/Domain/School/Repository/ISchoolUserRepository';
import { SchoolUser } from 'src/Domain/School/SchoolUser.entity';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { School } from '../../School/School.entity';
import { UserRole } from '../User.entity';

export class CanUserAccessToSchool {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ISchoolUserRepository')
    private readonly schoolUserRepository: ISchoolUserRepository
  ) {}

  public async isSatisfiedBy(school: School, userId: string): Promise<boolean> {
    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      return false;
    }

    return user.getRole() === UserRole.PHOTOGRAPHER ||
      (await this.schoolUserRepository.findOneByUserAndSchool(user, school)) instanceof SchoolUser;
  }
}
