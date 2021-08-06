import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { School } from 'src/Domain/School/School.entity';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { CreateIngestionCommand } from './CreateIngestionCommand';
import { CreateIngestionCommandHandler } from './CreateShootingCommandHandler';
import { IIngestionRepository } from 'src/Domain/Ingestion/Repository/IIngestionRepository';
import { Ingestion } from 'src/Domain/Ingestion/Ingestion.entity';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';

describe('CreateIngestionCommandHandler', () => {
  let ingestionRepository: IIngestionRepository;
  let schoolRepository: ISchoolRepository;
  let handler: CreateIngestionCommandHandler;

  const school = mock(School);
  const createdIngestion = mock(Ingestion);
  const command = new CreateIngestionCommand(
    '8c4ef867-1d31-43fe-87bd-19c87370f5f8'
  );

  beforeEach(() => {
    ingestionRepository = mock<IIngestionRepository>();
    schoolRepository = mock<ISchoolRepository>();

    handler = new CreateIngestionCommandHandler(
      instance(schoolRepository),
      instance(ingestionRepository)
    );
  });

  it('testShootingCreatedSuccessfully', async () => {
    when(schoolRepository.findOneById('8c4ef867-1d31-43fe-87bd-19c87370f5f8'))
      .thenResolve(instance(school));
    when(
      ingestionRepository.save(
        deepEqual(
          new Ingestion(
            instance(school)
          )
        )
      )
    ).thenResolve(instance(createdIngestion));

    when(createdIngestion.getId()).thenReturn(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );

    expect(await handler.execute(command)).toBe(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );

    verify(
      ingestionRepository.save(
        deepEqual(
          new Ingestion(
            instance(school)
          )
        )
      )
    ).once();
    verify(createdIngestion.getId()).once();
    verify(schoolRepository.findOneById('8c4ef867-1d31-43fe-87bd-19c87370f5f8')).once();
  });

  it('testSchoolNotFound', async () => {
    when(schoolRepository.findOneById('8c4ef867-1d31-43fe-87bd-19c87370f5f8'))
      .thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolNotFoundException);
      expect(e.message).toBe('schools.errors.not_found');
      verify(schoolRepository.findOneById('8c4ef867-1d31-43fe-87bd-19c87370f5f8')).once();
      verify(ingestionRepository.save(anything())).never();
    }
  });
});
