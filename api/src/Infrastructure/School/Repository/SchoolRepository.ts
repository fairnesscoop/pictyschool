import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from 'src/Domain/School/School.entity';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { MAX_ITEMS_PER_PAGE } from 'src/Application/Common/Pagination';

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

  public findOneById(id: string): Promise<School | undefined> {
    return this.repository
      .createQueryBuilder('school')
      .select([
        'school.id',
        'school.name',
        'school.reference',
        'school.address',
        'school.city',
        'school.zipCode',
        'school.phoneNumber',
        'school.email',
        'school.director',
        'school.directorCivility',
        'school.numberOfClasses',
        'school.numberOfStudents',
        'school.pdv',
        'school.observation',
        'schoolType.id',
        'schoolType.name'
      ])
      .leftJoin('school.schoolType', 'schoolType')
      .where('school.id = :id', { id })
      .getOne();
  }

  public findSchools(page: number = 1): Promise<[School[], number]> {
    return this.repository
      .createQueryBuilder('school')
      .select([
        'school.id',
        'school.name',
        'school.reference',
        'school.address',
        'school.city',
        'school.zipCode',
        'schoolType.id',
        'schoolType.name'
      ])
      .leftJoin('school.schoolType', 'schoolType')
      .orderBy('school.name', 'ASC')
      .limit(MAX_ITEMS_PER_PAGE)
      .offset((page - 1) * MAX_ITEMS_PER_PAGE)
      .getManyAndCount();
  }
}
