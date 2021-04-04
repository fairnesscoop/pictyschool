import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { User } from 'src/Domain/User/User.entity';
import { GetUserByEmailQuery } from './GetUserByEmailQuery';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  public async execute(query: GetUserByEmailQuery): Promise<User | undefined> {
    return await this.userRepository.findOneByEmail(query.email);
  }
}
