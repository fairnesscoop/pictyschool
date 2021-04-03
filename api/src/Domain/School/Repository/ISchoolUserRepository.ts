import { User } from 'src/Domain/User/User.entity';
import { School } from '../School.entity';
import { SchoolUser } from '../SchoolUser.entity';

export interface ISchoolUserRepository {
  save(schoolUser: SchoolUser): Promise<SchoolUser>;
  remove(schoolUser: SchoolUser): void;
  findOneById(id :string): Promise<SchoolUser | undefined>;
  findOneByUserAndSchool(user: User, school: School): Promise<SchoolUser | undefined>;
  findUsersBySchool(schoolId: string): Promise<SchoolUser[]>;
}
