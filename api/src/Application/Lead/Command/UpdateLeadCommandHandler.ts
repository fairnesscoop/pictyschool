import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateLeadCommand } from './UpdateLeadCommand';
import { ILeadRepository } from 'src/Domain/Lead/Repository/ILeadRepository';
import { IsLeadAlreadyExist } from 'src/Domain/Lead/Specification/IsLeadAlreadyExist';
import { LeadAlreadyExistException } from 'src/Domain/Lead/Exception/LeadAlreadyExistException';
import { LeadNotFoundException } from 'src/Domain/Lead/Exception/LeadNotFoundException';

@CommandHandler(UpdateLeadCommand)
export class UpdateLeadCommandHandler {
  constructor(
    @Inject('ILeadRepository')
    private readonly leadRepository: ILeadRepository,
    private readonly isLeadAlreadyExist: IsLeadAlreadyExist
  ) {}

  public async execute(command: UpdateLeadCommand): Promise<string> {
    const {
      id,
      reference,
      address,
      city,
      name,
      zipCode,
      status,
      type,
      numberOfStudents, 
      email,
      phoneNumber
    } = command;

    const lead = await this.leadRepository.findOneById(id);
    if (!lead) {
      throw new LeadNotFoundException();
    }

    if (
      reference !== lead.getReference() &&
      true === (await this.isLeadAlreadyExist.isSatisfiedBy(reference))
    ) {
      throw new LeadAlreadyExistException();
    }

    lead.update(
      reference,
      name,
      address,
      zipCode,
      city,
      status,
      type,
      email,
      phoneNumber,
      numberOfStudents
    );

    await this.leadRepository.save(lead);

    return lead.getId();
  }
}
