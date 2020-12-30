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
    const { reference, address, city, name, photographer, zipCode } = command;

    if (true === (await this.isSchoolAlreadyExist.isSatisfiedBy(reference))) {
      throw new SchoolAlreadyExistException();
    }

    const school = await this.schoolRepository.save(
      new School(reference, name, address, zipCode, city, photographer)
    );

    return school.getId();
  }
}
