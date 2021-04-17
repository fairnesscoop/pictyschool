import { Shooting } from '../Shooting.entity';

export interface IShootingRepository {
  save(shooting: Shooting): Promise<Shooting>;
}
