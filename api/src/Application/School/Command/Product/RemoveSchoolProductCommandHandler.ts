import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { SchoolProductNotFoundException } from 'src/Domain/School/Exception/SchoolProductNotFoundException';
import { ISchoolProductRepository } from 'src/Domain/School/Repository/ISchoolProductRepository';
import { RemoveSchoolProductCommand } from './RemoveSchoolProductCommand';

@CommandHandler(RemoveSchoolProductCommand)
export class RemoveSchoolProductCommandHandler {
  constructor(
    @Inject('ISchoolProductRepository')
    private readonly schoolProductRepository: ISchoolProductRepository,
  ) {}

  public async execute({ id }: RemoveSchoolProductCommand): Promise<void> {
    const schoolProduct = await this.schoolProductRepository.findOneById(id);

    if (!schoolProduct) {
      throw new SchoolProductNotFoundException();
    }

    this.schoolProductRepository.remove(schoolProduct);
  }
}
