import { Inject } from '@nestjs/common';
import { Photographer } from '../Photographer.entity';
import { IPhotographerRepository } from '../Repository/IPhotographerRepository';

export class IsEmailAlreadyExist {
  constructor(
    @Inject('IPhotographerRepository')
    private readonly photographerRepository: IPhotographerRepository
  ) {}

  public async isSatisfiedBy(email: string): Promise<boolean> {
    return (
      await this.photographerRepository.findOneByEmail(email)
    ) instanceof Photographer;
  }
}
