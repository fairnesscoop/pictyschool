import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { SchoolProductNotFoundException } from 'src/Domain/School/Exception/SchoolProductNotFoundException';
import { ISchoolProductRepository } from 'src/Domain/School/Repository/ISchoolProductRepository';
import { UpdateSchoolProductCommand } from './UpdateSchoolProductCommand';

@CommandHandler(UpdateSchoolProductCommand)
export class UpdateSchoolProductCommandHandler {
  constructor(
    @Inject('ISchoolProductRepository')
    private readonly schoolProductRepository: ISchoolProductRepository,
  ) {}

  public async execute(command: UpdateSchoolProductCommand): Promise<string> {
    const { unitPrice, id } = command;

    const schoolProduct = await this.schoolProductRepository.findOneById(id);

    if (!schoolProduct) {
      throw new SchoolProductNotFoundException();
    }

    schoolProduct.updateUnitPrice(Math.round(unitPrice * 100));
    this.schoolProductRepository.save(schoolProduct);

    return schoolProduct.getId();
  }
}
