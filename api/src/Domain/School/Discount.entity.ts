import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { School } from './School.entity';

export enum DiscountType {
  PERCENT = 'percent',
  AMOUNT = 'amount'
}

@Entity()
export class Discount {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column('enum', { enum: DiscountType, nullable: false })
  protected type: DiscountType;

  @Column({ type: 'integer', nullable: false })
  private amount: number;

  @Column({ type: 'integer', nullable: false })
  private value: number;

  @ManyToOne(() => School, { nullable: false, onDelete: 'CASCADE' })
  private school: School;

  constructor(
    type: DiscountType,
    amount: number,
    value: number,
    school: School
  ) {
    this.type = type;
    this.amount = amount;
    this.value = value;
    this.school = school;
  }

  public getId(): string {
    return this.id;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getValue(): number {
    return this.value;
  }

  public getType(): DiscountType {
    return this.type;
  }

  public getSchool(): School {
    return this.school;
  }
}
