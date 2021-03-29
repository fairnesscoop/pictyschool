import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { LeadAlreadyExistException } from 'src/Domain/Lead/Exception/LeadAlreadyExistException';
import { ILeadRepository } from 'src/Domain/Lead/Repository/ILeadRepository';
import { Lead } from 'src/Domain/Lead/Lead.entity';
import { IsLeadAlreadyExist } from 'src/Domain/Lead/Specification/IsLeadAlreadyExist';
import { CreateLeadCommand } from './CreateLeadCommand';

@CommandHandler(CreateLeadCommand)
export class CreateLeadCommandHandler {
  constructor(
    @Inject('ILeadRepository')
    private readonly leadRepository: ILeadRepository,
    private readonly isLeadAlreadyExist: IsLeadAlreadyExist
  ) {}

  public async execute(command: CreateLeadCommand): Promise<string> {
    const {
      reference,
      address,
      city,
      name,
      zipCode,
      numberOfStudents, 
      email,
      phoneNumber
    } = command;
    
    if (true === (await this.isLeadAlreadyExist.isSatisfiedBy(reference))) {
      throw new LeadAlreadyExistException();
    }

    const lead = await this.leadRepository.save(
      new Lead(
        reference,
        name,
        address,
        zipCode,
        city,
        email,
        phoneNumber,
        numberOfStudents
      )
    );

    return lead.getId();
  }
}
