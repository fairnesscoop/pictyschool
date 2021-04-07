import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { School } from '../School/School.entity';
import { User } from '../User/User.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'date', nullable: false })
  private fromDate: Date;

  @Column({ type: 'date', nullable: false })
  private toDate: Date;

  @Column({ type: 'varchar', nullable: true })
  private summary: string;

  @ManyToOne(type => School, { nullable: false, onDelete: 'CASCADE' })
  private school: School;

  @ManyToOne(type => User, { nullable: false, onDelete: 'CASCADE' })
  private photographer: User;

  constructor(
    fromDate: Date,
    toDate: Date,
    photographer: User,
    school: School,
    summary?: string
  ) {
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.photographer = photographer;
    this.school = school;
    this.summary = summary;
  }

  public getId(): string {
    return this.id;
  }

  public getFromDate(): Date {
    return this.fromDate;
  }

  public getToDate(): Date {
    return this.toDate;
  }

  public getSummary(): string | null {
    return this.summary;
  }

  public getSchool(): School | null {
    return this.school;
  }

  public getPhotographer(): User | null {
    return this.photographer;
  }
}
