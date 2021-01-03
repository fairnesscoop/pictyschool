import { Inject } from '@nestjs/common';
import { ISchoolRepository } from '../Repository/ISchoolRepository';
import { School } from '../School.entity';

export class IsSchoolAlreadyExist {
  constructor(
    @Inject('ISchoolRepository')
    private readonly schoolRepository: ISchoolRepository
  ) {}

  public async isSatisfiedBy(reference: string): Promise<boolean> {
    return (
      (await this.schoolRepository.findOneByReference(reference)) instanceof School
    );
  }
}
