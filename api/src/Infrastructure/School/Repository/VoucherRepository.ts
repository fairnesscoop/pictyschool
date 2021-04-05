import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IVoucherRepository } from 'src/Domain/School/Repository/IVoucherRepository';
import { Voucher } from 'src/Domain/School/Voucher.entity';
import { School } from 'src/Domain/School/School.entity';

@Injectable()
export class VoucherRepository implements IVoucherRepository {
  constructor(
    @InjectRepository(Voucher)
    private readonly repository: Repository<Voucher>
  ) {}

  public save(voucher: Voucher): Promise<Voucher> {
    return this.repository.save(voucher);
  }

  public remove(voucher: Voucher): void {
    this.repository.delete(voucher.getId());
  }

  public findOneById(id: string): Promise<Voucher | undefined> {
    return this.repository
      .createQueryBuilder('voucher')
      .select([ 'voucher.id' ])
      .where('voucher.id = :id', { id })
      .getOne();
  }

  public findOneByCode(code: string): Promise<Voucher | undefined> {
    return this.repository
      .createQueryBuilder('voucher')
      .select([
        'voucher.id',
        'voucher.code',
        'voucher.email',
        'school.id'
      ])
      .where('voucher.code = :code', { code })
      .innerJoin('voucher.school', 'school')
      .getOne();
  }

  public findOneByEmailAndSchool(email: string, school: School): Promise<Voucher | undefined> {
    return this.repository
      .createQueryBuilder('voucher')
      .select([ 'voucher.id' ])
      .where('lower(voucher.email) = :email', { email: email.toLowerCase() })
      .innerJoin('voucher.school', 'school', 'school.id = :id', { id: school.getId()})
      .getOne();
  }

  public findBySchool(schoolId: string): Promise<Voucher[]> {
    return this.repository
      .createQueryBuilder('voucher')
      .select([ 'voucher.id', 'voucher.email' ])
      .innerJoin('voucher.school', 'school', 'school.id = :schoolId', { schoolId })
      .getMany();
  }
}
