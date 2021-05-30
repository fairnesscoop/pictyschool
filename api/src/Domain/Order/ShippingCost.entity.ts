import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShippingCost {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'integer', nullable: false, default: 0 })
  private grams: number;

  @Column({ type: 'integer', nullable: false, default: 0 })
  private price: number;

  constructor(grams: number, price: number) {
    this.grams = grams;
    this.price = price;
  }

  public getId(): string {
    return this.id;
  }

  public getGrams(): number {
    return this.grams;
  }

  public getPrice(): number {
    return this.price;
  }

  public getPriceFromCents(): number {
    return this.price / 100;
  }
}
