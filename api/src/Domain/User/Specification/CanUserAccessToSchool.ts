import { Inject } from '@nestjs/common';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { School } from '../../School/School.entity';
import { UserRole } from '../User.entity';

export class CanUserAccessToSchool {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  public async isSatisfiedBy(school: School, userId: string): Promise<boolean> {
    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      return false;
    }

    return user.getRole() === UserRole.PHOTOGRAPHER ||
      school.getDirector()?.getId() === userId;
  }
}
