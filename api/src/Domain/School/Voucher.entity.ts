import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { School } from './School.entity';

@Entity()
export class Voucher {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({type: 'varchar', nullable: false})
  private code: string;

  @Column({type: 'varchar', nullable: false})
  private email: string;

  @ManyToOne(type => School, {onDelete: 'CASCADE', nullable: false})
  private school: School;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  private createdAt: string;

  constructor(code: string, email: string, school: School) {
    this.code = code;
    this.email = email;
    this.school = school;
  }

  public getId(): string {
    return this.id;
  }

  public getCode(): string {
    return this.code;
  }

  public getEmail(): string {
    return this.email;
  }

  public getSchool(): School {
    return this.school;
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }
}
