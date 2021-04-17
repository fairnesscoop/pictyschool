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
  private shoointingDate: Date;

  @Column({ type: 'date', nullable: false })
  private closingDate: Date;

  @Column('enum', { enum: ShootingStatus, nullable: false, default: ShootingStatus.DISABLED })
  private status: ShootingStatus;

  @ManyToOne(() => School, { nullable: false, onDelete: 'CASCADE' })
  private school: School;

  constructor(
    name: string,
    shoointingDate: Date,
    closingDate: Date,
    status: ShootingStatus,
    school: School
  ) {
    this.name = name;
    this.shoointingDate = shoointingDate;
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

  public getShoointingDate(): Date {
    return this.shoointingDate;
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
}
