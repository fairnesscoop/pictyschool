import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { School } from './School.entity';

@Entity()
export class Discount {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'integer', nullable: false })
  private amount: number;

  @Column({ type: 'integer', nullable: false })
  private discount: number;

  @ManyToOne(() => School, { nullable: false, onDelete: 'CASCADE' })
  private school: School;

  constructor(
    amount: number,
    discount: number,
    school: School
  ) {
    this.amount = amount;
    this.discount = discount;
    this.school = school;
  }

  public getId(): string {
    return this.id;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getDiscount(): number {
    return this.discount;
  }

  public getSchool(): School {
    return this.school;
  }
}
