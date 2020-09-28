import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Photographer } from 'src/Domain/User/Photographer.entity';
import { IPhotographerRepository } from 'src/Domain/User/Repository/IPhotographerRepository';

@Injectable()
export class PhotographerRepository implements IPhotographerRepository {
  constructor(
    @InjectRepository(Photographer)
    private readonly repository: Repository<Photographer>
  ) {}
}
