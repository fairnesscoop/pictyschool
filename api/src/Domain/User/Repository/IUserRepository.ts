import { User, UserRole } from '../User.entity';

export interface IUserRepository {
  save(user: User): Promise<User>;
  remove(user: User): void;
  findOneByApiToken(apiToken: string): Promise<User | undefined>;
  findOneByEmail(email: string): Promise<User | undefined>;
  findOneById(id: string): Promise<User | undefined>;
  findUsersByRole(role: UserRole): Promise<User[]>;
}
