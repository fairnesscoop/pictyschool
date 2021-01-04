import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IPasswordEncoder } from 'src/Application/IPasswordEncoder';
import { UpdateProfileCommand } from './UpdateProfileCommand';
import { IPhotographerRepository } from 'src/Domain/User/Repository/IPhotographerRepository';
import { IsEmailAlreadyExist } from 'src/Domain/User/Specification/IsEmailAlreadyExist';
import { EmailAlreadyExistException } from 'src/Domain/User/Exception/EmailAlreadyExistException';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileCommandHandler {
  constructor(
    @Inject('IPhotographerRepository')
    private readonly photographerRepository: IPhotographerRepository,
    @Inject('IPasswordEncoder')
    private readonly passwordEncoder: IPasswordEncoder,
    private readonly isEmailAlreadyExist: IsEmailAlreadyExist
  ) {}

  public async execute(command: UpdateProfileCommand): Promise<void> {
    const { firstName, lastName, password, photographer } = command;
    const email = command.email.toLowerCase();

    if (
      email !== photographer.getEmail() &&
      true === (await this.isEmailAlreadyExist.isSatisfiedBy(email))
    ) {
      throw new EmailAlreadyExistException();
    }

    photographer.update(firstName, lastName, email);

    if (password) {
      photographer.updatePassword(await this.passwordEncoder.hash(password));
    }

    await this.photographerRepository.save(photographer);
  }
}
