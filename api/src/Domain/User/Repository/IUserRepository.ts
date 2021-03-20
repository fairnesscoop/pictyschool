import { User } from '../User.entity';

export interface IUserRepository {
  save(user: User): Promise<User>;
  findOneByApiToken(apiToken: string): Promise<User | undefined>;
  findOneByEmail(email: string): Promise<User | undefined>;
  findOneById(id: string): Promise<User | undefined>;
}
