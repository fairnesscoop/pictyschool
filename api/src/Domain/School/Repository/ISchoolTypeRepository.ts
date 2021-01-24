import { SchoolType } from '../SchoolType.entity';

export interface ISchoolTypeRepository {
  save(schoolType: SchoolType): Promise<SchoolType>;
  findAll(): Promise<SchoolType[]>;
  findOneById(id: string): Promise<SchoolType | undefined>;
  findOneByName(name: string): Promise<SchoolType | undefined>;
}
