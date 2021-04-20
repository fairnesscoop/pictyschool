import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import { Classroom } from './Classroom.entity';

export enum PhotoType {
  UNIT = 'unit',
  BROTHERS_SISTERS = 'brothers_sisters',
  GROUP = 'group'
}

@Entity()
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column('enum', { enum: PhotoType, nullable: false })
  private type: PhotoType;

  @Column({ type: 'varchar', nullable: false })
  private name: string;

  @Column({ type: 'varchar', nullable: false })
  private path: string;

  @Column({ type: 'varchar', nullable: false })
  private token: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  private createdAt: Date;

  @ManyToOne(() => Classroom, { nullable: false, onDelete: 'CASCADE' })
  private classroom: Classroom;

  constructor(
    type: PhotoType,
    name: string,
    path: string,
    token: string,
    classroom: Classroom
  ) {
    this.type = type;
    this.name = name;
    this.path = path;
    this.token = token;
    this.classroom = classroom;
  }

  public getId(): string {
    return this.id;
  }

  public getType(): PhotoType {
    return this.type;
  }

  public getName(): string {
    return this.name;
  }

  public getPath(): string {
    return this.path;
  }

  public getToken(): string {
    return this.token;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getClassroom(): Classroom {
    return this.classroom;
  }
}
