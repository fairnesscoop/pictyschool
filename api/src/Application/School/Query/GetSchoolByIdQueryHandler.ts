import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSchoolByIdQuery } from './GetSchoolByIdQuery';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { SchoolDetailView } from '../View/SchoolDetailView';
import { CanUserAccessToSchool } from 'src/Domain/User/Specification/CanUserAccessToSchool';
import { UserCantAccessToSchoolException } from 'src/Domain/User/Exception/UserCantAccessToSchoolException';

@QueryHandler(GetSchoolByIdQuery)
export class GetSchoolByIdQueryHandler {
  constructor(
    @Inject('ISchoolRepository')
    private readonly schoolRepository: ISchoolRepository,
    private readonly canUserAccessToSchool: CanUserAccessToSchool
  ) {}

  public async execute(query: GetSchoolByIdQuery): Promise<SchoolDetailView> {
    const { id, userId } = query;
    const school = await this.schoolRepository.findOneById(id);

    if (!school) {
      throw new SchoolNotFoundException();
    }

    if (false === await this.canUserAccessToSchool.isSatisfiedBy(school, userId)) {
      throw new UserCantAccessToSchoolException();
    }

    return new SchoolDetailView(
      school.getId(),
      school.getName(),
      school.getReference(),
      school.getAddress(),
      school.getCity(),
      school.getZipCode(),
      school.getStatus(),
      school.getType(),
      school.getEmail(),
      school.getPhoneNumber(),
      school.getNumberOfClasses(),
      school.getNumberOfStudents(),
      school.getPdv(),
      school.getObservation()
    );
  }
}
