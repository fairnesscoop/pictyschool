import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { IDiscountRepository } from 'src/Domain/School/Repository/IDiscountRepository';
import { Discount } from 'src/Domain/School/Discount.entity';
import { CreateDiscountCommand } from './CreateDiscountCommand';
import { IsDiscountAlreadyExist } from 'src/Domain/School/Specification/Discount/IsDiscountAlreadyExist';
import { DiscountAlreadyExistException } from 'src/Domain/School/Exception/DiscountAlreadyExistException';

@CommandHandler(CreateDiscountCommand)
export class CreateDiscountCommandHandler {
  constructor(
    @Inject('ISchoolRepository')
    private readonly schoolRepository: ISchoolRepository,
    @Inject('IDiscountRepository')
    private readonly discountRepository: IDiscountRepository,
    private readonly isDiscountAlreadyExist: IsDiscountAlreadyExist,
  ) {}

  public async execute(command: CreateDiscountCommand): Promise<string> {
    const { amount, value, type, schoolId } = command;

    const school = await this.schoolRepository.findOneById(schoolId);
    if (!school) {
      throw new SchoolNotFoundException();
    }

    const roundedAmount = Math.round(amount * 100);
    const roundedValue = Math.round(value * 100);

    if (true === (await this.isDiscountAlreadyExist.isSatisfiedBy(roundedAmount, school))) {
      throw new DiscountAlreadyExistException();
    }

    const savedDiscount = await this.discountRepository.save(
      new Discount(
        type,
        roundedAmount,
        roundedValue,
        school
      )
    );

    return savedDiscount.getId();
  }
}
