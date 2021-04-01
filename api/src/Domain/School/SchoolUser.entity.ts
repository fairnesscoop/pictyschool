import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { School } from './School.entity';
import { User } from '../User/User.entity';

@Entity()
export class SchoolUser {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @ManyToOne(() => School, { nullable: false, onDelete: 'CASCADE' })
  private school: School;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  private user: User;

  constructor(school: School, user: User) {
    this.school = school;
    this.user = user;
  }

  public getId(): string {
    return this.id;
  }

  public getSchool(): School {
    return this.school;
  }

  public getUser(): User {
    return this.user;
  }
}
