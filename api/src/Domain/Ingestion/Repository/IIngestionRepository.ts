import { Ingestion } from 'src/Domain/Ingestion/Ingestion.entity';

export interface IIngestionRepository {
  save(ingestion: Ingestion): Promise<Ingestion>;
}
