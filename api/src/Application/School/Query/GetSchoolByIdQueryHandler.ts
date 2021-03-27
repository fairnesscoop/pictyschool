import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSchoolByIdQuery } from './GetSchoolByIdQuery';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { SchoolTypeView } from '../View/SchoolTypeView';
import { SchoolDetailView } from '../View/SchoolDetailView';
import { UserSummaryView } from 'src/Application/User/View/UserSummaryView';

@QueryHandler(GetSchoolByIdQuery)
export class GetSchoolByIdQueryHandler {
  constructor(
    @Inject('ISchoolRepository')
    private readonly schoolRepository: ISchoolRepository
  ) {}

  public async execute(query: GetSchoolByIdQuery): Promise<SchoolDetailView> {
    const school = await this.schoolRepository.findOneById(query.id);

    if (!school) {
      throw new SchoolNotFoundException();
    }

    const schoolType = school.getSchoolType();
    const schoolTypeView = schoolType ?
      new SchoolTypeView(
        schoolType.getId(),
        schoolType.getName()
      ) : null;

    const director = school.getDirector();
    const directorView = director ?
      new UserSummaryView(
        director.getId(),
        director.getFirstName(),
        director.getLastName(),
        director.getEmail()
      ) : null;
    

    return new SchoolDetailView(
      school.getId(),
      school.getName(),
      school.getReference(),
      school.getAddress(),
      school.getCity(),
      school.getZipCode(),
      school.getPhoneNumber(),
      school.getNumberOfClasses(),
      school.getNumberOfStudents(),
      school.getPdv(),
      school.getObservation(),
      schoolTypeView,
      directorView
    );
  }
}
