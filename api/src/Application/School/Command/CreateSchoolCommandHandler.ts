import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { SchoolAlreadyExistException } from 'src/Domain/School/Exception/SchoolAlreadyExistException';
import { SchoolTypeNotFoundException } from 'src/Domain/School/Exception/SchoolTypeNotFoundException';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { ISchoolTypeRepository } from 'src/Domain/School/Repository/ISchoolTypeRepository';
import { School } from 'src/Domain/School/School.entity';
import { IsSchoolAlreadyExist } from 'src/Domain/School/Specification/IsSchoolAlreadyExist';
import { CreateSchoolCommand } from './CreateSchoolCommand';

@CommandHandler(CreateSchoolCommand)
export class CreateSchoolCommandHandler {
  constructor(
    @Inject('ISchoolRepository')
    private readonly schoolRepository: ISchoolRepository,
    @Inject('ISchoolTypeRepository')
    private readonly schoolTypeRepository: ISchoolTypeRepository,
    private readonly isSchoolAlreadyExist: IsSchoolAlreadyExist
  ) {}

  public async execute(command: CreateSchoolCommand): Promise<string> {
    const {
      reference,
      address,
      city,
      schoolTypeId,
      name,
      zipCode,
      director,
      directorCivility,
      email,
      numberOfClasses,
      numberOfStudents, 
      observation,
      pdv,
      phoneNumber
    } = command;

    const schoolType = await this.schoolTypeRepository.findOneById(schoolTypeId);
    if (!schoolType) {
      throw new SchoolTypeNotFoundException();
    }

    if (true === (await this.isSchoolAlreadyExist.isSatisfiedBy(reference))) {
      throw new SchoolAlreadyExistException();
    }

    const school = await this.schoolRepository.save(
      new School(
        reference,
        name,
        address,
        zipCode,
        city,
        phoneNumber,
        director,
        directorCivility,
        email,
        numberOfStudents,
        numberOfClasses,
        observation,
        pdv,
        schoolType
      )
    );

    return school.getId();
  }
}
