import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class Quote {
    @PrimaryGeneratedColumn('uuid')
    private id: string;

    @Column({type: 'string', nullable: false, unique: false})
    private firstName: string;
      
    @Column({type: 'string', nullable: false, unique: false})
    private lastName: string;
  
    @Column({type: 'string', nullable: false, unique: true})
    private email: string;

    @Column({type: 'string', nullable: false, unique: true})
    private password: string;
  

    constructor(
      email: string,
      firstname: string,
      password: string,
      lastname: string,

    ) {
      this.password = password;
      this.email = email;
      this.lastName = lastname;
      this.firstName = firstname;
    }
  
  }
