import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShippingCost {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'integer', nullable: false, default: 0 })
  private weight: number;

  @Column({ type: 'integer', nullable: false, default: 0 })
  private price: number;

  constructor(weight: number, price: number) {
    this.weight = weight;
    this.price = price;
  }

  public getId(): string {
    return this.id;
  }

  public getWeight(): number {
    return this.weight;
  }

  public getPrice(): number {
    return this.price;
  }

  public getPriceFromCents(): number {
    return this.price / 100;
  }

  public update(weight: number, price: number): void {
    this.weight = weight;
    this.price = price;
  }
}
