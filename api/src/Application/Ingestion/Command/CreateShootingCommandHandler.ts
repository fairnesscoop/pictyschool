import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Ingestion } from 'src/Domain/Ingestion/Ingestion.entity';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { IIngestionRepository } from 'src/Domain/Ingestion/Repository/IIngestionRepository';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { CreateIngestionCommand } from './CreateIngestionCommand';

@CommandHandler(CreateIngestionCommand)
export class CreateIngestionCommandHandler {
  constructor(
    @Inject('ISchoolRepository')
    private readonly schoolRepository: ISchoolRepository,
    @Inject('IIngestionRepository')
    private readonly ingestionRepository: IIngestionRepository,
  ) {}

  public async execute(command: CreateIngestionCommand): Promise<string> {
    const { schoolId } = command;
    const school = await this.schoolRepository.findOneById(schoolId);
    if (!school) {
      throw new SchoolNotFoundException();
    }

    const ingestion = await this.ingestionRepository.save(
      new Ingestion(
        school
      )
    );

    return ingestion.getId();
  }
}
