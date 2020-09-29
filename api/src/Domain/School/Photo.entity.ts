import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne
} from 'typeorm';
import { School } from './School.entity';
import { AccessToken } from './AccessToken.entity';

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  private createdAt: Date;

  @ManyToOne(type => School, { nullable: false, onDelete: 'CASCADE' })
  private school: School;

  @OneToOne(
    type => AccessToken,
    accessToken => accessToken.photo
  )
  accessToken: AccessToken;

  constructor(type: PhotoType, name: string, path: string, school: School) {
    this.type = type;
    this.name = name;
    this.path = path;
    this.school = school;
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

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getSchool(): School {
    return this.school;
  }

  public getAccessToken(): AccessToken {
    return this.accessToken;
  }
}
