import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from 'src/Domain/School/School.entity';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';

@Injectable()
export class SchoolRepository implements ISchoolRepository {
  constructor(
    @InjectRepository(School)
    private readonly repository: Repository<School>
  ) {}

  public save(school: School): Promise<School> {
    return this.repository.save(school);
  }

  public findOneByReference(reference: string): Promise<School | undefined> {
    return this.repository
      .createQueryBuilder('school')
      .select([
        'school.id'
      ])
      .where('lower(school.reference) = :reference', { reference: reference.toLowerCase() })
      .getOne();
  }
}
