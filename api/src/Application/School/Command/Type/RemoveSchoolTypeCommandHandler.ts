import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { SchoolTypeNotFoundException } from 'src/Domain/School/Exception/SchoolTypeNotFoundException';
import { ISchoolTypeRepository } from 'src/Domain/School/Repository/ISchoolTypeRepository';
import { RemoveSchoolTypeCommand } from './RemoveSchoolTypeCommand';

@CommandHandler(RemoveSchoolTypeCommand)
export class RemoveSchoolTypeCommandHandler {
  constructor(
    @Inject('ISchoolTypeRepository')
    private readonly schoolTypeRepository: ISchoolTypeRepository,
  ) {}

  public async execute({ id }: RemoveSchoolTypeCommand): Promise<void> {
    const schoolType = await this.schoolTypeRepository.findOneById(id);

    if (!schoolType) {
      throw new SchoolTypeNotFoundException();
    }

    await this.schoolTypeRepository.remove(schoolType);
  }
}
