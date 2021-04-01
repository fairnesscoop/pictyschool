import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolUser } from 'src/Domain/School/SchoolUser.entity';
import { ISchoolUserRepository } from 'src/Domain/School/Repository/ISchoolUserRepository';
import { School } from 'src/Domain/School/School.entity';
import { User } from 'src/Domain/User/User.entity';

@Injectable()
export class SchoolUserRepository implements ISchoolUserRepository {
  constructor(
    @InjectRepository(SchoolUser)
    private readonly repository: Repository<SchoolUser>
  ) {}

  public save(schooluser: SchoolUser): Promise<SchoolUser> {
    return this.repository.save(schooluser);
  }

  public findOneByUserAndSchool(user: User, school: School): Promise<SchoolUser | undefined> {
    return this.repository
      .createQueryBuilder('schoolUser')
      .select('schoolUser.id')
      .innerJoin(
        'schoolUser.user',
        'user',
        'user.id = :userId',
        { userId: user.getId() }
      )
      .innerJoin(
        'schoolUser.school',
        'school',
        'school.id = :schoolId',
        { schoolId: school.getId() }
      )
      .getOne();
  }

  public findUsersBySchool(schoolId: string): Promise<SchoolUser[]> {
    return this.repository
      .createQueryBuilder('schoolUser')
      .select([
        'schoolUser.id',
        'user.firstName',
        'user.lastName',
        'user.email'
      ])
      .innerJoin('schoolUser.user', 'user')
      .innerJoin('schoolUser.school', 'school', 'school.id = :schoolId', { schoolId })
      .getMany();
  }
}
