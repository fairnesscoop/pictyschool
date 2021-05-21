import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IShootingRepository } from 'src/Domain/School/Repository/IShootingRepository';
import { Shooting } from 'src/Domain/School/Shooting.entity';

@Injectable()
export class ShootingRepository implements IShootingRepository {
  constructor(
    @InjectRepository(Shooting)
    private readonly repository: Repository<Shooting>
  ) { }

  public save(shooting: Shooting): Promise<Shooting> {
    return this.repository.save(shooting);
  }

  public findBySchool(schoolId: string): Promise<Shooting[]> {
    return this.repository
      .createQueryBuilder('shooting')
      .select([
        'shooting.id',
        'shooting.name',
        'shooting.status',
        'shooting.shootingDate',
        'shooting.closingDate'
      ])
      .innerJoin('shooting.school', 'school', 'school.id = :schoolId', { schoolId })
      .orderBy('shooting.shootingDate', 'DESC')
      .getMany();
  }

  public findOneById(id: string): Promise<Shooting | undefined> {
    return this.repository
      .createQueryBuilder('shooting')
      .select([
        'shooting.id',
        'shooting.name',
        'shooting.status',
        'shooting.shootingDate',
        'shooting.closingDate'
      ])
      .where('shooting.id = :id', { id })
      .getOne();
  }

  public countBySchool(id: string): Promise<number> {
    return this.repository
      .createQueryBuilder('shooting')
      .select('shooting.id')
      .innerJoin('shooting.school', 'school', 'school.id = :id', { id })
      .getCount();
  }
}
