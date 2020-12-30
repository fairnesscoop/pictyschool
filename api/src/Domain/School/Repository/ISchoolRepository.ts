import { School } from '../School.entity';

export interface ISchoolRepository {
  save(task: School): Promise<School>;
  findOneByReference(reference: string): Promise<School | undefined>;
}
