import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { LeadNotFoundException } from 'src/Domain/Lead/Exception/LeadNotFoundException';
import { ILeadRepository } from 'src/Domain/Lead/Repository/ILeadRepository';
import { RemoveLeadCommand } from './RemoveLeadCommand';

@CommandHandler(RemoveLeadCommand)
export class RemoveLeadCommandHandler {
  constructor(
    @Inject('ILeadRepository')
    private readonly leadRepository: ILeadRepository,
  ) {}

  public async execute({ id }: RemoveLeadCommand): Promise<void> {
    const lead = await this.leadRepository.findOneById(id);

    if (!lead) {
      throw new LeadNotFoundException();
    }

    await this.leadRepository.remove(lead);
  }
}
