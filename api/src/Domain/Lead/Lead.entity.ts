import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lead {
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

  @Column({ type: 'varchar', nullable: false })
  private phoneNumber: string;

  @Column({ type: 'varchar', nullable: false })
  private email: string;

  @Column({ type: 'integer', nullable: true, default: 0 })
  private numberOfStudents: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  private createdAt: number;

  constructor(
    reference: string,
    name: string,
    address: string,
    zipCode: string,
    city: string,
    email: string,
    phoneNumber: string,
    numberOfStudents?: number,
  ) {
    this.reference = reference;
    this.name = name;
    this.address = address;
    this.zipCode = zipCode;
    this.city = city;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.numberOfStudents = numberOfStudents;
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

  public getEmail(): string {
    return this.email;
  }

  public getPhoneNumber(): string {
    return this.phoneNumber;
  }

  public getNumberOfStudents(): number {
    return this.numberOfStudents;
  }

  public getCreatedAt(): number {
    return this.createdAt;
  }
}
