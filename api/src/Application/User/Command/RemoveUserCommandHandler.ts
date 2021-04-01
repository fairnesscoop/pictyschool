import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CantRemoveYourselfException } from 'src/Domain/User/Exception/CantRemoveYourselfException';
import { UserNotFoundException } from 'src/Domain/User/Exception/UserNotFoundException';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { RemoveUserCommand } from './RemoveUserCommand';

@CommandHandler(RemoveUserCommand)
export class RemoveUserCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute({ id, currentUserId }: RemoveUserCommand): Promise<void> {
    if (id === currentUserId) {
      throw new CantRemoveYourselfException();      
    }

    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    await this.userRepository.remove(user);
  }
}
