import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSchoolTypeByIdQuery } from './GetSchoolTypeByIdQuery';
import { ISchoolTypeRepository } from 'src/Domain/School/Repository/ISchoolTypeRepository';
import { SchoolTypeNotFoundException } from 'src/Domain/School/Exception/SchoolTypeNotFoundException';
import { SchoolTypeView } from '../../View/SchoolTypeView';

@QueryHandler(GetSchoolTypeByIdQuery)
export class GetSchoolTypeByIdQueryHandler {
  constructor(
    @Inject('ISchoolTypeRepository')
    private readonly schoolTypeRepository: ISchoolTypeRepository
  ) {}

  public async execute(query: GetSchoolTypeByIdQuery): Promise<SchoolTypeView> {
    const schoolType = await this.schoolTypeRepository.findOneById(query.id);

    if (!schoolType) {
      throw new SchoolTypeNotFoundException();
    }

    return new SchoolTypeView(
      schoolType.getId(),
      schoolType.getName()
    );
  }
}
