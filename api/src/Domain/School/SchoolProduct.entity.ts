import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from '../Product/Product.entity';
import { School } from './School.entity';

@Entity()
export class SchoolProduct {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'integer', nullable: false, default: 0 })
  private unitPrice: number;

  @ManyToOne(() => School, { nullable: false, onDelete: 'CASCADE' })
  private school: School;

  @ManyToOne(() => Product, { nullable: true, onDelete: 'CASCADE' })
  private product: Product;

  constructor(
    unitPrice: number,
    school: School,
    product: Product
  ) {
    this.unitPrice = unitPrice;
    this.school = school;
    this.product = product;
  }

  public getId(): string {
    return this.id;
  }

  public getUnitPrice(): number {
    return this.unitPrice;
  }

  public getSchool(): School {
    return this.school;
  }

  public getProduct(): Product {
    return this.product;
  }
}
