import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { IPhotographerRepository } from 'src/Domain/User/Repository/IPhotographerRepository';
import { Photographer } from 'src/Domain/User/Photographer.entity';

@Injectable()
export class PhotographerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    @Inject('IPhotographerRepository')
    private readonly photographerRepository: IPhotographerRepository
  ) {
    super();
  }

  public async validate(token: string): Promise<Photographer> {
    const photographer = await this.photographerRepository.findOneByApiToken(token);

    if (!(photographer instanceof Photographer)) {
      throw new UnauthorizedException();
    }

    return photographer;
  }
}
