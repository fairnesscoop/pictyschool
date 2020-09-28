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
}
