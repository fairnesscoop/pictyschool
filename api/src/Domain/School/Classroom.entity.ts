import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import { Shooting } from './Shooting.entity';

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'varchar', nullable: false })
  private name: string;

  @ManyToOne(() => Shooting, { nullable: false, onDelete: 'CASCADE' })
  private shooting: Shooting;

  constructor(name: string, shooting: Shooting) {
    this.name = name;
    this.shooting = shooting;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getShooting(): Shooting {
    return this.shooting;
  }
}
