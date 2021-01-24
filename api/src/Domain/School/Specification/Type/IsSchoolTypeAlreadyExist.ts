import { Inject } from '@nestjs/common';
import { ISchoolTypeRepository } from '../../Repository/ISchoolTypeRepository';
import { SchoolType } from '../../SchoolType.entity';

export class IsSchoolTypeAlreadyExist {
  constructor(
    @Inject('ISchoolTypeRepository')
    private readonly schoolTypeRepository: ISchoolTypeRepository
  ) {}

  public async isSatisfiedBy(name: string): Promise<boolean> {
    return (await this.schoolTypeRepository.findOneByName(name)) instanceof SchoolType;
  }
}
