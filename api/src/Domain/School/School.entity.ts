import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Photographer } from '../User/Photographer.entity';
import { SchoolType } from './SchoolType.entity';

@Entity()
export class School {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'varchar', nullable: false })
  private reference: string;

  @Column({ type: 'varchar', nullable: false })
  private name: string;

  @Column({ type: 'varchar', nullable: false })
  private address: string;

  @Column({ type: 'varchar', nullable: false })
  private zipCode: string;

  @Column({ type: 'varchar', nullable: false })
  private city: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  private createdAt: Date;

  @ManyToOne(() => Photographer, { nullable: true, onDelete: 'SET NULL' })
  private photographer: Photographer;

  @ManyToOne(() => SchoolType, { nullable: true, onDelete: 'SET NULL' })
  private schoolType: SchoolType;

  constructor(
    reference: string,
    name: string,
    address: string,
    zipCode: string,
    city: string,
    photographer: Photographer,
    schoolType: SchoolType
  ) {
    this.reference = reference;
    this.name = name;
    this.address = address;
    this.zipCode = zipCode;
    this.city = city;
    this.photographer = photographer;
    this.schoolType = schoolType;
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

  public getAddress(): string {
    return this.address;
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
  
  public getSchoolType(): SchoolType {
    return this.schoolType;
  }

  public update(
    reference: string,
    name: string,
    address: string,
    zipCode: string,
    city: string,
    schoolType: SchoolType,
  ): void {
    this.reference = reference;
    this.name = name;
    this.address = address;
    this.zipCode = zipCode;
    this.city = city;
    this.schoolType = schoolType;
  }
}
