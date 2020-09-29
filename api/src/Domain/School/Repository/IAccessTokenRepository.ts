import { AccessToken } from '../AccessToken.entity';

export interface IAccessTokenRepository {
  save(task: AccessToken): Promise<AccessToken>;
}
