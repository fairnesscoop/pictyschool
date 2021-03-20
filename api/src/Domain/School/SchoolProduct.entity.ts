import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from '../Product/Product.entity';
import { School } from './School.entity';

@Entity()
export class SchoolProduct {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'integer', nullable: false, default: 0 })
  private parentUnitPrice: number;

  @Column({ type: 'integer', nullable: false, default: 0 })
  private userUnitPrice: number;

  @ManyToOne(() => School, { nullable: false, onDelete: 'CASCADE' })
  private school: School;

  @ManyToOne(() => Product, { nullable: true, onDelete: 'CASCADE' })
  private product: Product;

  constructor(
    parentUnitPrice: number,
    userUnitPrice: number,
    school: School,
    product: Product
  ) {
    this.parentUnitPrice = parentUnitPrice;
    this.userUnitPrice = userUnitPrice;
    this.school = school;
    this.product = product;
  }

  public updatePrices(parentUnitPrice: number, userUnitPrice: number): void {
    this.parentUnitPrice = parentUnitPrice;
    this.userUnitPrice = userUnitPrice;
  }

  public getId(): string {
    return this.id;
  }

  public getUserUnitPrice(): number {
    return this.userUnitPrice;
  }

  public getParentUnitPrice(): number {
    return this.parentUnitPrice;
  }

  public getSchool(): School {
    return this.school;
  }

  public getProduct(): Product {
    return this.product;
  }
}
