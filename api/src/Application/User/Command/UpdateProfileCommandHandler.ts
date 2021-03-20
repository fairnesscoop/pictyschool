import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IPasswordEncoder } from 'src/Application/IPasswordEncoder';
import { UpdateProfileCommand } from './UpdateProfileCommand';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { IsEmailAlreadyExist } from 'src/Domain/User/Specification/IsEmailAlreadyExist';
import { EmailAlreadyExistException } from 'src/Domain/User/Exception/EmailAlreadyExistException';
import { UserNotFoundException } from 'src/Domain/User/Exception/UserNotFoundException';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordEncoder')
    private readonly passwordEncoder: IPasswordEncoder,
    private readonly isEmailAlreadyExist: IsEmailAlreadyExist
  ) {}

  public async execute(command: UpdateProfileCommand): Promise<void> {
    const { firstName, lastName, password, id } = command;
    const email = command.email.toLowerCase();

    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new UserNotFoundException();
    }

    if (
      email !== user.getEmail() &&
      true === (await this.isEmailAlreadyExist.isSatisfiedBy(email))
    ) {
      throw new EmailAlreadyExistException();
    }

    user.update(firstName, lastName, email);

    if (password) {
      user.updatePassword(await this.passwordEncoder.hash(password));
    }

    await this.userRepository.save(user);
  }
}
