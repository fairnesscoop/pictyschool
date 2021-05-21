import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { School } from './School.entity';

export enum ShootingStatus {
  ENABLED = 'enabled',
  DISABLED = 'disabled'
}

@Entity()
export class Shooting {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'varchar', nullable: false })
  private name: string;

  @Column({ type: 'date', nullable: false })
  private shootingDate: Date;

  @Column({ type: 'date', nullable: false })
  private closingDate: Date;

  @Column('enum', { enum: ShootingStatus, nullable: false, default: ShootingStatus.DISABLED })
  private status: ShootingStatus;

  @ManyToOne(() => School, { nullable: false, onDelete: 'CASCADE' })
  private school: School;

  constructor(
    name: string,
    shootingDate: Date,
    closingDate: Date,
    status: ShootingStatus,
    school: School
  ) {
    this.name = name;
    this.shootingDate = shootingDate;
    this.closingDate = closingDate;
    this.status = status;
    this.school = school;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getShootingDate(): Date {
    return this.shootingDate;
  }

  public getClosingDate(): Date {
    return this.closingDate;
  }

  public getSchool(): School {
    return this.school;
  }

  public getStatus(): ShootingStatus {
    return this.status;
  }

  public update(
    name: string,
    shootingDate: Date,
    closingDate: Date,
  ): void {
    this.name = name;
    this.shootingDate = shootingDate;
    this.closingDate = closingDate;
  }
}
