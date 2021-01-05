import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSchoolByIdQuery } from './GetSchoolByIdQuery';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { SchoolView } from '../View/SchoolView';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';

@QueryHandler(GetSchoolByIdQuery)
export class GetSchoolByIdQueryHandler {
  constructor(
    @Inject('ISchoolRepository')
    private readonly schoolRepository: ISchoolRepository
  ) {}

  public async execute(query: GetSchoolByIdQuery): Promise<SchoolView> {
    const school = await this.schoolRepository.findOneById(query.id);

    if (!school) {
      throw new SchoolNotFoundException();
    }

    return new SchoolView(
      school.getId(),
      school.getName(),
      school.getReference(),
      school.getAddress(),
      school.getCity(),
      school.getZipCode()
    );
  }
}
