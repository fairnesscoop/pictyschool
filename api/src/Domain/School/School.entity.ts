import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../User/User.entity';
import { AbstractSchool, Status, Type } from './AbstractSchool';

@Entity()
export class School extends AbstractSchool {
  @Column({ type: 'text', nullable: true })
  private observation: string;

  @Column({ type: 'timestamp', nullable: true })
  private pdv: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  private director: User;

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
    numberOfClasses?: number,
    observation?: string,
    pdv?: string
  ) {
    super(
      reference,
      name,
      address,
      zipCode,
      city,
      status,
      type,
      phoneNumber,
      numberOfStudents,
      numberOfClasses
    );

    this.observation = observation;
    this.pdv = pdv;
  }

  public getObservation(): string {
    return this.observation;
  }

  public getPdv(): string {
    return this.pdv;
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
    status: Status,
    type: Type,
    phoneNumber?: string,
    numberOfStudents?: number,
    numberOfClasses?: number,
    observation?: string,
    pdv?: string
  ): void {
    this.baseUpdate(
      reference,
      name,
      address,
      zipCode,
      city,
      status,
      type,
      phoneNumber,
      numberOfStudents,
      numberOfClasses
    );

    this.observation = observation;
    this.pdv = pdv;
  }

  public updateDirector(director: User): void {
    this.director = director;
  }
}
