import { Entity, Column } from 'typeorm';
import { AbstractSchool, Status, Type } from './AbstractSchool';

@Entity()
export class School extends AbstractSchool {
  @Column({ type: 'text', nullable: true })
  private observation: string;

  constructor(
    reference: string,
    name: string,
    address: string,
    zipCode: string,
    city: string,
    status: Status,
    type: Type,
    email?: string,
    phoneNumber?: string,
    numberOfStudents?: number,
    numberOfClasses?: number,
    observation?: string
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
      email,
      numberOfStudents,
      numberOfClasses
    );

    this.observation = observation;
  }

  public getObservation(): string {
    return this.observation;
  }

  public update(
    reference: string,
    name: string,
    address: string,
    zipCode: string,
    city: string,
    status: Status,
    type: Type,
    email?: string,
    phoneNumber?: string,
    numberOfStudents?: number,
    numberOfClasses?: number,
    observation?: string
  ): void {
    this.baseUpdate(
      reference,
      name,
      address,
      zipCode,
      city,
      status,
      type,
      email,
      phoneNumber,
      numberOfStudents,
      numberOfClasses
    );

    this.observation = observation;
  }
}
