import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'varchar', nullable: false })
  private title: string;

  @Column({ type: 'varchar', nullable: true })
  private description: string;

  @Column({ type: 'integer', nullable: false, default: 0 })
  private unitPrice: number;

  @Column({ type: 'integer', nullable: false, default: 0 })
  private weight: number;

  constructor(
    title: string,
    description: string,
    unitPrice: number,
    weight: number
  ) {
    this.title = title;
    this.description = description;
    this.unitPrice = unitPrice;
    this.weight = weight;
  }

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getUnitPrice(): number {
    return this.unitPrice;
  }

  public getWeight(): number {
    return this.weight;
  }

  public getPriceFromCents(): number {
    return this.unitPrice / 100;
  }

  public update(
    title: string,
    description: string,
    unitPrice: number,
    weight: number
  ): void {
    this.title = title;
    this.description = description;
    this.unitPrice = unitPrice;
    this.weight = weight;
  }
}
