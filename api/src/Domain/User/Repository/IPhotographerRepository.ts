import { Photographer } from '../Photographer.entity';

export interface IPhotographerRepository {
  save(photographer: Photographer): Promise<Photographer>;
  findOneByApiToken(apiToken: string): Promise<Photographer | undefined>;
  findOneByEmail(email: string): Promise<Photographer | undefined>;
  findOneById(id: string): Promise<Photographer | undefined>;
}
