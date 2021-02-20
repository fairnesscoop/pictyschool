import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ISchoolTypeRepository } from 'src/Domain/School/Repository/ISchoolTypeRepository';
import { SchoolType } from 'src/Domain/School/SchoolType.entity';

@Injectable()
export class SchoolTypeRepository implements ISchoolTypeRepository {
  constructor(
    @InjectRepository(SchoolType)
    private readonly repository: Repository<SchoolType>
  ) {}

  public save(schoolType: SchoolType): Promise<SchoolType> {
    return this.repository.save(schoolType);
  }

  public remove(schoolType: SchoolType): void {
    this.repository.delete(schoolType.getId());
  }

  public findAll(): Promise<SchoolType[]> {
    return this.repository
      .createQueryBuilder('schoolType')
      .select([ 'schoolType.id', 'schoolType.name' ])
      .orderBy('schoolType.name', 'ASC')
      .getMany();
  }

  public findOneById(id: string): Promise<SchoolType | undefined> {
    return this.repository
      .createQueryBuilder('schoolType')
      .select([ 'schoolType.id', 'schoolType.name' ])
      .where('schoolType.id = :id', { id })
      .getOne();
  }

  public findOneByName(name: string): Promise<SchoolType | undefined> {
    return this.repository
      .createQueryBuilder('schoolType')
      .select([ 'schoolType.id' ])
      .where('lower(schoolType.name) = :name', { name: name.toLowerCase() })
      .getOne();
  }
}
