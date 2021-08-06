import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IIngestionRepository } from 'src/Domain/Ingestion/Repository/IIngestionRepository';
import { Ingestion } from 'src/Domain/Ingestion/Ingestion.entity';

@Injectable()
export class IngestionRepository implements IIngestionRepository {
  constructor(
    @InjectRepository(Ingestion)
    private readonly repository: Repository<Ingestion>
  ) {}

  public save(ingestion: Ingestion): Promise<Ingestion> {
    return this.repository.save(ingestion);
  }
}
