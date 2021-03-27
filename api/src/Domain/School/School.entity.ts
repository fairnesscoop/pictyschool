import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../User/User.entity';
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

  @Column({ type: 'varchar', nullable: true })
  private phoneNumber: string;

  @Column({ type: 'integer', nullable: true, default: 0 })
  private numberOfStudents: number;

  @Column({ type: 'integer', nullable: true, default: 0 })
  private numberOfClasses: number;

  @Column({ type: 'text', nullable: true })
  private observation: string;

  @Column({ type: 'timestamp', nullable: true })
  private pdv: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  private createdAt: number;

  @ManyToOne(() => SchoolType, { nullable: true, onDelete: 'SET NULL' })
  private schoolType: SchoolType;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  private director: User;

  constructor(
    reference: string,
    name: string,
    address: string,
    zipCode: string,
    city: string,
    phoneNumber?: string,
    numberOfStudents?: number,
    numberOfClasses?: number,
    observation?: string,
    pdv?: string,
    schoolType?: SchoolType
  ) {
    this.reference = reference;
    this.name = name;
    this.address = address;
    this.zipCode = zipCode;
    this.city = city;
    this.phoneNumber = phoneNumber;
    this.numberOfStudents = numberOfStudents;
    this.numberOfClasses = numberOfClasses;
    this.observation = observation;
    this.pdv = pdv;
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

  public getPhoneNumber(): string {
    return this.phoneNumber;
  }

  public getNumberOfStudents(): number {
    return this.numberOfStudents;
  }

  public getNumberOfClasses(): number {
    return this.numberOfClasses;
  }

  public getObservation(): string {
    return this.observation;
  }

  public getPdv(): string {
    return this.pdv;
  }

  public getCreatedAt(): number {
    return this.createdAt;
  }

  public getSchoolType(): SchoolType {
    return this.schoolType;
  }

  public getDirector(): User | null {
    return this.director;
  }

  public update(
    reference: string,
    name: string,
    address: string,
    zipCode: string,
    city: string,
    phoneNumber?: string,
    numberOfStudents?: number,
    numberOfClasses?: number,
    observation?: string,
    pdv?: string,
    schoolType?: SchoolType
  ): void {
    this.reference = reference;
    this.name = name;
    this.address = address;
    this.zipCode = zipCode;
    this.city = city;
    this.phoneNumber = phoneNumber;
    this.numberOfStudents = numberOfStudents;
    this.numberOfClasses = numberOfClasses;
    this.observation = observation;
    this.pdv = pdv;
    this.schoolType = schoolType;
  }

  public updateDirector(director: User): void {
    this.director = director;
  }
}
