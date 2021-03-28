import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSchoolTypesQuery } from './GetSchoolTypesQuery';
import { ISchoolTypeRepository } from 'src/Domain/School/Repository/ISchoolTypeRepository';
import { SchoolTypeView } from '../../View/SchoolTypeView';

@QueryHandler(GetSchoolTypesQuery)
export class GetSchoolTypesQueryHandler {
  constructor(
    @Inject('ISchoolTypeRepository')
    private readonly schoolTypeRepository: ISchoolTypeRepository
  ) {}

  public async execute(): Promise<SchoolTypeView[]> {
    const schoolTypeViews: SchoolTypeView[] = [];
    const schoolTypes = await this.schoolTypeRepository.findAll();

    for (const schoolType of schoolTypes) {
      schoolTypeViews.push(
        new SchoolTypeView(
          schoolType.getId(),
          schoolType.getName()
        )
      );
    }

    return schoolTypeViews;
  }
}
