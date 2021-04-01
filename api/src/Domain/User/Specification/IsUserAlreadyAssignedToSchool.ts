import { Inject } from '@nestjs/common';
import { ISchoolUserRepository } from 'src/Domain/School/Repository/ISchoolUserRepository';
import { SchoolUser } from 'src/Domain/School/SchoolUser.entity';
import { School } from '../../School/School.entity';
import { User, UserRole } from '../User.entity';

export class IsUserAlreadyAssignedToSchool {
  constructor(
    @Inject('ISchoolUserRepository')
    private readonly schoolUserRepository: ISchoolUserRepository
  ) {}

  public async isSatisfiedBy(school: School, user: User): Promise<boolean> {
    if (user.getRole() === UserRole.PHOTOGRAPHER) {
      return true;
    }

    return (
      (await this.schoolUserRepository.findOneByUserAndSchool(user, school)) instanceof SchoolUser
    );
  }
}
