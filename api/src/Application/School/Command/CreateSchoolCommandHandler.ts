import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { SchoolAlreadyExistException } from 'src/Domain/School/Exception/SchoolAlreadyExistException';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { School } from 'src/Domain/School/School.entity';
import { IsSchoolAlreadyExist } from 'src/Domain/School/Specification/IsSchoolAlreadyExist';
import { CreateSchoolCommand } from './CreateSchoolCommand';

@CommandHandler(CreateSchoolCommand)
export class CreateSchoolCommandHandler {
  constructor(
    @Inject('ISchoolRepository')
    private readonly schoolRepository: ISchoolRepository,
    private readonly isSchoolAlreadyExist: IsSchoolAlreadyExist
  ) {}

  public async execute(command: CreateSchoolCommand): Promise<string> {
    const {
      reference,
      address,
      city,
      name,
      zipCode,
      email,
      numberOfClasses,
      numberOfStudents,
      status,
      type, 
      observation,
      pdv,
      phoneNumber
    } = command;

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
        status,
        type,
        email,
        phoneNumber,
        numberOfStudents,
        numberOfClasses,
        observation,
        pdv
      )
    );

    return school.getId();
  }
}
