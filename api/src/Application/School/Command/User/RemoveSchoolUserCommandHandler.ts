import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { SchoolUserNotFoundException } from 'src/Domain/School/Exception/SchoolUserNotFoundException';
import { ISchoolUserRepository } from 'src/Domain/School/Repository/ISchoolUserRepository';
import { RemoveSchoolUserCommand } from './RemoveSchoolUserCommand';

@CommandHandler(RemoveSchoolUserCommand)
export class RemoveSchoolUserCommandHandler {
  constructor(
    @Inject('ISchoolUserRepository')
    private readonly schoolUserRepository: ISchoolUserRepository,
  ) {}

  public async execute({ id }: RemoveSchoolUserCommand): Promise<void> {
    const schoolUser = await this.schoolUserRepository.findOneById(id);

    if (!schoolUser) {
      throw new SchoolUserNotFoundException();
    }

    await this.schoolUserRepository.remove(schoolUser);
  }
}
