import { School } from '../School.entity';

export interface ISchoolRepository {
  save(school: School): Promise<School>;
  findOneByReference(reference: string): Promise<School | undefined>;
  findSchools(page: number): Promise<[School[], number]>;
  findOneById(id: string): Promise<School | undefined>;
}
