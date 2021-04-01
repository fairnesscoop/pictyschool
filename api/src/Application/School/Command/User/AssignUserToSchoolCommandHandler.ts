import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { ISchoolUserRepository } from 'src/Domain/School/Repository/ISchoolUserRepository';
import { SchoolUser } from 'src/Domain/School/SchoolUser.entity';
import { UserAlreadyAssignedToSchoolException } from 'src/Domain/User/Exception/UserAlreadyAssignedToSchoolException';
import { UserNotFoundException } from 'src/Domain/User/Exception/UserNotFoundException';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { IsUserAlreadyAssignedToSchool } from 'src/Domain/User/Specification/IsUserAlreadyAssignedToSchool';
import { AssignUserToSchoolCommand } from './AssignUserToSchoolCommand';

@CommandHandler(AssignUserToSchoolCommand)
export class AssignUserToSchoolCommandHandler {
  constructor(
    @Inject('ISchoolRepository')
    private readonly schoolRepository: ISchoolRepository,
    @Inject('ISchoolUserRepository')
    private readonly schoolUserRepository: ISchoolUserRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly isUserAlreadyAssignedToSchool: IsUserAlreadyAssignedToSchool,
  ) {}

  public async execute(command: AssignUserToSchoolCommand): Promise<string> {
    const { schoolId, userId } = command;

    const school = await this.schoolRepository.findOneById(schoolId);
    if (!school) {
      throw new SchoolNotFoundException();
    }

    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    if (true === (await this.isUserAlreadyAssignedToSchool.isSatisfiedBy(school, user))) {
      throw new UserAlreadyAssignedToSchoolException();
    }

    const schoolUser = await this.schoolUserRepository.save(
      new SchoolUser(school, user)
    );

    return schoolUser.getId();
  }
}
