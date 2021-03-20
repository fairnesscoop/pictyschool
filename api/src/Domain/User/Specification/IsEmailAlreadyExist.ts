import { Inject } from '@nestjs/common';
import { User } from '../User.entity';
import { IUserRepository } from '../Repository/IUserRepository';

export class IsEmailAlreadyExist {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  public async isSatisfiedBy(email: string): Promise<boolean> {
    return (
      await this.userRepository.findOneByEmail(email)
    ) instanceof User;
  }
}
