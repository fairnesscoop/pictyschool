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
  private photographerUnitPrice: number;

  @ManyToOne(() => School, { nullable: false, onDelete: 'CASCADE' })
  private school: School;

  @ManyToOne(() => Product, { nullable: true, onDelete: 'CASCADE' })
  private product: Product;

  constructor(
    parentUnitPrice: number,
    photographerUnitPrice: number,
    school: School,
    product: Product
  ) {
    this.parentUnitPrice = parentUnitPrice;
    this.photographerUnitPrice = photographerUnitPrice;
    this.school = school;
    this.product = product;
  }

  public updatePrices(parentUnitPrice: number, photographerUnitPrice: number): void {
    this.parentUnitPrice = parentUnitPrice;
    this.photographerUnitPrice = photographerUnitPrice;
  }

  public getId(): string {
    return this.id;
  }

  public getPhotographerUnitPrice(): number {
    return this.photographerUnitPrice;
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
