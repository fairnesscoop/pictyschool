import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { IPhotographerRepository } from 'src/Domain/User/Repository/IPhotographerRepository';
import { UserAuthView } from './UserAuthView';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    @Inject('IPhotographerRepository')
    private readonly photographerRepository: IPhotographerRepository
  ) {
    super();
  }

  public async validate(token: string): Promise<UserAuthView> {
    const photographer = await this.photographerRepository.findOneByApiToken(token);
    if (!photographer) {
      throw new UnauthorizedException();
    }

    return new UserAuthView(photographer.getId(), 'photographer');
  }
}
