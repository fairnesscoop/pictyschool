import { AccessToken } from '../AccessToken.entity';

export interface IAccessTokenRepository {
  save(accessToken: AccessToken): Promise<AccessToken>;
}
