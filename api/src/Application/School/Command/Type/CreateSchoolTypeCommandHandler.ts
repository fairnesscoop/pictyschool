import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { SchoolTypeAlreadyExistException } from 'src/Domain/School/Exception/SchoolTypeAlreadyExistException';
import { ISchoolTypeRepository } from 'src/Domain/School/Repository/ISchoolTypeRepository';
import { SchoolType } from 'src/Domain/School/SchoolType.entity';
import { IsSchoolTypeAlreadyExist } from 'src/Domain/School/Specification/Type/IsSchoolTypeAlreadyExist';
import { CreateSchoolTypeCommand } from './CreateSchoolTypeCommand';

@CommandHandler(CreateSchoolTypeCommand)
export class CreateSchoolTypeCommandHandler {
  constructor(
    @Inject('ISchoolTypeRepository')
    private readonly schoolTypeRepository: ISchoolTypeRepository,
    private readonly isSchoolTypeAlreadyExist: IsSchoolTypeAlreadyExist,
  ) {}

  public async execute(command: CreateSchoolTypeCommand): Promise<string> {
    const { name } = command;

    if (true === (await this.isSchoolTypeAlreadyExist.isSatisfiedBy(name))) {
      throw new SchoolTypeAlreadyExistException();
    }

    const schoolType = await this.schoolTypeRepository.save(
      new SchoolType(name)
    );

    return schoolType.getId();
  }
}
