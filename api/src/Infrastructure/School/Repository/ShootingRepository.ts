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
  ) {}

  public save(shooting: Shooting): Promise<Shooting> {
    return this.repository.save(shooting);
  }
}
