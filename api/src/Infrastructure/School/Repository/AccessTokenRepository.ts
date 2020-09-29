import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessToken } from 'src/Domain/School/AccessToken.entity';
import { IAccessTokenRepository } from 'src/Domain/School/Repository/IAccessTokenRepository';

@Injectable()
export class AccessTokenRepository implements IAccessTokenRepository {
  constructor(
    @InjectRepository(AccessToken)
    private readonly repository: Repository<AccessToken>
  ) {}
}
