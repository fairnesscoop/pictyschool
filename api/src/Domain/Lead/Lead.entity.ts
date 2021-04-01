import { Entity } from 'typeorm';
import { AbstractSchool, Status, Type } from '../School/AbstractSchool';

@Entity()
export class Lead extends AbstractSchool {
  constructor(
    reference: string,
    name: string,
    address: string,
    zipCode: string,
    city: string,
    status: Status,
    type: Type,
    email: string,
    phoneNumber: string,
    numberOfStudents?: number,
    numberOfClasses?: number,
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
  }

  public update(
    reference: string,
    name: string,
    address: string,
    zipCode: string,
    city: string,
    status: Status,
    type: Type,
    email: string,
    phoneNumber: string,
    numberOfStudents?: number,
    numberOfClasses?: number,
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
  }
}
