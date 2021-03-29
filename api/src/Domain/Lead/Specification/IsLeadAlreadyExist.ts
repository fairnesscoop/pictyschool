import { Inject } from '@nestjs/common';
import { ILeadRepository } from '../Repository/ILeadRepository';
import { Lead } from '../Lead.entity';

export class IsLeadAlreadyExist {
  constructor(
    @Inject('ILeadRepository')
    private readonly leadRepository: ILeadRepository
  ) {}

  public async isSatisfiedBy(reference: string): Promise<boolean> {
    return (
      (await this.leadRepository.findOneByRef(reference)) instanceof Lead
    );
  }
}
