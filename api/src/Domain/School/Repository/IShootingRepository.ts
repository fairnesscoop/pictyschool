import { Shooting } from '../Shooting.entity';

export interface IShootingRepository {
  save(shooting: Shooting): Promise<Shooting>;
  findBySchool(schoolId: string): Promise<Shooting[]>;
  countBySchool(schoolId: string): Promise<number>;
}
