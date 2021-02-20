import { SchoolType } from '../SchoolType.entity';

export interface ISchoolTypeRepository {
  save(schoolType: SchoolType): Promise<SchoolType>;
  remove(schoolType: SchoolType): void;
  findAll(): Promise<SchoolType[]>;
  findOneById(id: string): Promise<SchoolType | undefined>;
  findOneByName(name: string): Promise<SchoolType | undefined>;
}
