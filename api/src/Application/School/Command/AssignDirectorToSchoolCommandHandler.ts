import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { UserNotFoundException } from 'src/Domain/User/Exception/UserNotFoundException';
import { UserShouldBeDirectorException } from 'src/Domain/User/Exception/UserShouldBeDirectorException';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { UserRole } from 'src/Domain/User/User.entity';
import { AssignDirectorToSchoolCommand } from './AssignDirectorToSchoolCommand';

@CommandHandler(AssignDirectorToSchoolCommand)
export class AssignDirectorToSchoolCommandHandler {
  constructor(
    @Inject('ISchoolRepository')
    private readonly schoolRepository: ISchoolRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(command: AssignDirectorToSchoolCommand): Promise<string> {
    const { schoolId, userId } = command;

    const school = await this.schoolRepository.findOneById(schoolId);
    if (!school) {
      throw new SchoolNotFoundException();
    }

    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    if (user.getRole() !== UserRole.DIRECTOR) {
      throw new UserShouldBeDirectorException();
    }

    school.updateDirector(user);
    await this.schoolRepository.save(school);

    return school.getId();
  }
}
