import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { UserNotFoundException } from 'src/Domain/User/Exception/UserNotFoundException';
import { User } from 'src/Domain/User/User.entity';
import { School } from 'src/Domain/School/School.entity';

export abstract class AbstractEventCommandHandler {
  constructor(
    private readonly schoolRepository: ISchoolRepository,
    private readonly userRepository: IUserRepository
  ) {}

  protected async getUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  protected async getSchool(schoolId: string): Promise<School> {
    const school = await this.schoolRepository.findOneById(schoolId);
    if (!school) {
      throw new SchoolNotFoundException();
    }

    return school;
  }
}
