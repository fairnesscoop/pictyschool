import { Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Status {
  PRIVATE = 'private',
  PUBLIC = 'public'
}

export enum Type {
  KINDERGARTEN = 'kindergarten',
  PRIMARY = 'primary',
  ELEMENTARY = 'elementary',
  MIDDLE_SCHOOL = 'middle_school',
  HIGH_SCHOOL = 'high_school',
}

export abstract class AbstractSchool {
  @PrimaryGeneratedColumn('uuid')
  protected id: string;

  @Column({ type: 'varchar', nullable: false })
  protected reference: string;

  @Column({ type: 'varchar', nullable: false })
  protected name: string;

  @Column({ type: 'varchar', nullable: false })
  protected address: string;

  @Column({ type: 'varchar', nullable: false })
  protected zipCode: string;

  @Column({ type: 'varchar', nullable: false })
  protected city: string;

  @Column('enum', { enum: Status, nullable: false })
  protected status: Status;

  @Column('enum', { enum: Type, nullable: false })
  protected type: Type;

  @Column({ type: 'varchar', nullable: true })
  protected phoneNumber: string;

  @Column({ type: 'integer', nullable: true, default: 0 })
  protected numberOfStudents: number;

  @Column({ type: 'integer', nullable: true, default: 0 })
  protected numberOfClasses: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  protected createdAt: number;

  constructor(
    reference: string,
    name: string,
    address: string,
    zipCode: string,
    city: string,
    status: Status,
    type: Type,
    phoneNumber?: string,
    numberOfStudents?: number,
    numberOfClasses?: number
  ) {
    this.reference = reference;
    this.name = name;
    this.address = address;
    this.zipCode = zipCode;
    this.city = city;
    this.status = status;
    this.type = type;
    this.phoneNumber = phoneNumber;
    this.numberOfStudents = numberOfStudents;
    this.numberOfClasses = numberOfClasses;
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

  public getStatus(): Status {
    return this.status;
  }

  public getType(): Type {
    return this.type;
  }

  public getPhoneNumber(): string {
    return this.phoneNumber;
  }

  public getNumberOfStudents(): number {
    return this.numberOfStudents;
  }

  public getNumberOfClasses(): number {
    return this.numberOfClasses;
  }

  public getCreatedAt(): number {
    return this.createdAt;
  }

  protected baseUpdate(
    reference: string,
    name: string,
    address: string,
    zipCode: string,
    city: string,
    status: Status,
    type: Type,
    phoneNumber?: string,
    numberOfStudents?: number,
    numberOfClasses?: number
  ) {
    this.reference = reference;
    this.name = name;
    this.address = address;
    this.zipCode = zipCode;
    this.city = city;
    this.status = status;
    this.type = type;
    this.phoneNumber = phoneNumber;
    this.numberOfStudents = numberOfStudents;
    this.numberOfClasses = numberOfClasses;
  }
}
