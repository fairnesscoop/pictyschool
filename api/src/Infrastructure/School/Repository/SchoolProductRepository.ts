import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolProduct } from 'src/Domain/School/SchoolProduct.entity';
import { ISchoolProductRepository } from 'src/Domain/School/Repository/ISchoolProductRepository';

@Injectable()
export class SchoolProductRepository implements ISchoolProductRepository {
  constructor(
    @InjectRepository(SchoolProduct)
    private readonly repository: Repository<SchoolProduct>
  ) {}

  public save(schoolProduct: SchoolProduct): Promise<SchoolProduct> {
    return this.repository.save(schoolProduct);
  }
}
