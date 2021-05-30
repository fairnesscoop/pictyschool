import { ShootingStatus } from 'src/Domain/School/Shooting.entity';

export class ShootingView {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly status: ShootingStatus,
    public readonly shootingDate: Date,
    public readonly closingDate: Date,
    public readonly notice?: string,
  ) {}
}
