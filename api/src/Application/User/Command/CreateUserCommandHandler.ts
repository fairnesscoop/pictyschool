import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateUserCommand } from './CreateUserCommand';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { IPasswordEncoder } from 'src/Application/IPasswordEncoder';
import { User } from 'src/Domain/User/User.entity';
import { IsEmailAlreadyExist } from 'src/Domain/User/Specification/IsEmailAlreadyExist';
import { EmailAlreadyExistException } from 'src/Domain/User/Exception/EmailAlreadyExistException';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordEncoder')
    private readonly passwordEncoder: IPasswordEncoder,
    private readonly isEmailAlreadyExist: IsEmailAlreadyExist
  ) {}

  public async execute(command: CreateUserCommand): Promise<string> {
    const { firstName, lastName, password, role } = command;
    const email = command.email.toLowerCase();

    if (true === (await this.isEmailAlreadyExist.isSatisfiedBy(email))) {
      throw new EmailAlreadyExistException();
    }

    const hashPassword = await this.passwordEncoder.hash(password);
    const apiToken = await this.passwordEncoder.hash(email + password);
    const user = await this.userRepository.save(
      new User(
        firstName,
        lastName,
        email,
        apiToken,
        hashPassword,
        role
      )
    );

    return user.getId();
  }
}
