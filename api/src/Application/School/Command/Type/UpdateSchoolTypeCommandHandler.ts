import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { SchoolTypeAlreadyExistException } from 'src/Domain/School/Exception/SchoolTypeAlreadyExistException';
import { SchoolTypeNotFoundException } from 'src/Domain/School/Exception/SchoolTypeNotFoundException';
import { ISchoolTypeRepository } from 'src/Domain/School/Repository/ISchoolTypeRepository';
import { IsSchoolTypeAlreadyExist } from 'src/Domain/School/Specification/Type/IsSchoolTypeAlreadyExist';
import { UpdateSchoolTypeCommand } from './UpdateSchoolTypeCommand';

@CommandHandler(UpdateSchoolTypeCommand)
export class UpdateSchoolTypeCommandHandler {
  constructor(
    @Inject('ISchoolTypeRepository')
    private readonly schoolTypeRepository: ISchoolTypeRepository,
    private readonly isSchoolTypeAlreadyExist: IsSchoolTypeAlreadyExist
  ) {}

  public async execute(command: UpdateSchoolTypeCommand): Promise<string> {
    const { name, id } = command;

    const schoolType = await this.schoolTypeRepository.findOneById(id);
    if (!schoolType) {
      throw new SchoolTypeNotFoundException();
    }

    if (
      name !== schoolType.getName() &&
      true === (await this.isSchoolTypeAlreadyExist.isSatisfiedBy(name))
    ) {
      throw new SchoolTypeAlreadyExistException();
    }

    schoolType.update(name);
    this.schoolTypeRepository.save(schoolType);

    return schoolType.getId();
  }
}
