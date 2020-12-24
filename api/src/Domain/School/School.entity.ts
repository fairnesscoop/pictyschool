import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Photographer } from '../User/Photographer.entity';

@Entity()
export class School {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'varchar', nullable: false })
  private reference: string;

  @Column({ type: 'varchar', nullable: false })
  private name: string;

  @Column({ type: 'varchar', nullable: false })
  private zipCode: string;

  @Column({ type: 'varchar', nullable: false })
  private city: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  private createdAt: Date;

  @ManyToOne(() => Photographer, { nullable: true, onDelete: 'SET NULL' })
  private photographer: Photographer;

  constructor(
    reference: string,
    name: string,
    zipCode: string,
    city: string,
    photographer: Photographer
  ) {
    this.reference = reference;
    this.name = name;
    this.zipCode = zipCode;
    this.city = city;
    this.photographer = photographer;
  }

  public getId(): string {
    return this.id;
  }

  public getReference(): string {
    return this.reference;
  }

  public getName(): string {
    return this.name;
  }

  public getZipCode(): string {
    return this.zipCode;
  }

  public getCity(): string {
    return this.city;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getPhotographer(): Photographer {
    return this.photographer;
  }
}
