import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateSchoolCommand } from './UpdateSchoolCommand';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { IsSchoolAlreadyExist } from 'src/Domain/School/Specification/IsSchoolAlreadyExist';
import { SchoolAlreadyExistException } from 'src/Domain/School/Exception/SchoolAlreadyExistException';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { ISchoolTypeRepository } from 'src/Domain/School/Repository/ISchoolTypeRepository';
import { SchoolTypeNotFoundException } from 'src/Domain/School/Exception/SchoolTypeNotFoundException';

@CommandHandler(UpdateSchoolCommand)
export class UpdateSchoolCommandHandler {
  constructor(
    @Inject('ISchoolRepository')
    private readonly schoolRepository: ISchoolRepository,
    @Inject('ISchoolTypeRepository')
    private readonly schoolTypeRepository: ISchoolTypeRepository,
    private readonly isSchoolAlreadyExist: IsSchoolAlreadyExist
  ) {}

  public async execute(command: UpdateSchoolCommand): Promise<string> {
    const { id, schoolTypeId, reference, name, address, city, zipCode } = command;

    const school = await this.schoolRepository.findOneById(id);
    if (!school) {
      throw new SchoolNotFoundException();
    }

    const schoolType = await this.schoolTypeRepository.findOneById(schoolTypeId);
    if (!schoolType) {
      throw new SchoolTypeNotFoundException();
    }

    if (
      reference !== school.getReference() &&
      true === (await this.isSchoolAlreadyExist.isSatisfiedBy(reference))
    ) {
      throw new SchoolAlreadyExistException();
    }

    school.update(reference, name, address, zipCode, city, schoolType);

    await this.schoolRepository.save(school);

    return school.getId();
  }
}
