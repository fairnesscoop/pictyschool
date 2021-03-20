import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { UserAuthView } from './UserAuthView';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {
    super();
  }

  public async validate(token: string): Promise<UserAuthView> {
    const user = await this.userRepository.findOneByApiToken(token);
    if (!user) {
      throw new UnauthorizedException();
    }

    return new UserAuthView(user.getId(), 'user');
  }
}
