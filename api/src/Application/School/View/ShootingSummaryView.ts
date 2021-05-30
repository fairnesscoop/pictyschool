import { ShootingStatus } from 'src/Domain/School/Shooting.entity';

export class ShootingSummaryView {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly status: ShootingStatus,
    public readonly shootingDate: Date
  ) {}
}
