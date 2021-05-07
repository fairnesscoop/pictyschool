import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import { School } from '../School/School.entity';

export enum State {
  INIT = 'init',
  UPLOAD_STARTED = 'upload_started',
  UPLOAD_CANCELLED = 'upload_cancelled',
  UPLOAD_FINISHED = 'upload_finished',
  FAILED = 'failed'
}

@Entity()
export class Ingestion {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column('enum', { enum: State, nullable: false, default: State.INIT })
  private state: State;

  @ManyToOne(() => School, { nullable: false, onDelete: 'CASCADE' })
  private school: School;

  constructor(school: School) {
    this.school = school;
    this.state = State.INIT;
  }

  public getId(): string {
    return this.id;
  }

  public getState(): State {
    return this.state;
  }

  public getSchool(): School {
    return this.school;
  }
}
