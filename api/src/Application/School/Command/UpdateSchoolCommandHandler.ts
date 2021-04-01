import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateSchoolCommand } from './UpdateSchoolCommand';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { IsSchoolAlreadyExist } from 'src/Domain/School/Specification/IsSchoolAlreadyExist';
import { SchoolAlreadyExistException } from 'src/Domain/School/Exception/SchoolAlreadyExistException';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';

@CommandHandler(UpdateSchoolCommand)
export class UpdateSchoolCommandHandler {
  constructor(
    @Inject('ISchoolRepository')
    private readonly schoolRepository: ISchoolRepository,
    private readonly isSchoolAlreadyExist: IsSchoolAlreadyExist
  ) {}

  public async execute(command: UpdateSchoolCommand): Promise<string> {
    const {
      id,
      reference,
      address,
      city,
      name,
      email,
      zipCode,
      numberOfClasses,
      numberOfStudents,
      status,
      type,
      observation,
      pdv,
      phoneNumber
    } = command;

    const school = await this.schoolRepository.findOneById(id);
    if (!school) {
      throw new SchoolNotFoundException();
    }

    if (
      reference !== school.getReference() &&
      true === (await this.isSchoolAlreadyExist.isSatisfiedBy(reference))
    ) {
      throw new SchoolAlreadyExistException();
    }

    school.update(
      reference,
      name,
      address,
      zipCode,
      city,
      status,
      type,
      email,
      phoneNumber,
      numberOfStudents,
      numberOfClasses,
      observation,
      pdv
    );

    await this.schoolRepository.save(school);

    return school.getId();
  }
}
