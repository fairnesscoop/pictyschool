import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { School } from '../School/School.entity';
import { User } from '../User/User.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'timestamp', nullable: false })
  private date: Date;

  @Column({ type: 'varchar', nullable: true })
  private summary: string;

  @ManyToOne(type => School, { nullable: false, onDelete: 'CASCADE' })
  private school: School;

  @ManyToOne(type => User, { nullable: false, onDelete: 'CASCADE' })
  private photographer: User;

  constructor(
    date: Date,
    photographer: User,
    school: School,
    summary?: string
  ) {
    this.date = date;
    this.photographer = photographer;
    this.school = school;
    this.summary = summary;
  }

  public getId(): string {
    return this.id;
  }

  public getDate(): Date {
    return this.date;
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

  public update(
    date: Date,
    photographer: User,
    school: School,
    summary?: string
  ): void {
    this.date = date;
    this.photographer = photographer;
    this.school = school;
    this.summary = summary;
  }
}
