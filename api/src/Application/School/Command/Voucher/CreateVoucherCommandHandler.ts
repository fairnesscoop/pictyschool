import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateVoucherCommand } from './CreateVoucherCommand';
import { Voucher } from 'src/Domain/School/Voucher.entity';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { IVoucherRepository } from 'src/Domain/School/Repository/IVoucherRepository';
import { ICodeGenerator } from 'src/Application/ICodeGenerator';
import { IsVoucherAlreadyGenerated } from 'src/Domain/School/Specification/IsVoucherAlreadyGenerated';
import { VoucherAlreadyGeneratedException } from 'src/Domain/School/Exception/VoucherAlreadyGeneratedException';

@CommandHandler(CreateVoucherCommand)
export class CreateVoucherCommandHandler {
  constructor(
    @Inject('IVoucherRepository')
    private readonly voucherRepository: IVoucherRepository,
    @Inject('ISchoolRepository')
    private readonly schoolRepository: ISchoolRepository,
    @Inject('ICodeGenerator')
    private readonly codeGenerator: ICodeGenerator,
    private readonly isVoucherAlreadyGenerated: IsVoucherAlreadyGenerated
  ) {}

  public async execute(command: CreateVoucherCommand): Promise<string> {
    const { schoolId, email } = command;

    const school = await this.schoolRepository.findOneById(schoolId);
    if (!school) {
      throw new SchoolNotFoundException();
    }

    if (true === (await this.isVoucherAlreadyGenerated.isSatisfiedBy(email, school))) {
      throw new VoucherAlreadyGeneratedException();
    }

    const voucher = await this.voucherRepository.save(
      new Voucher(this.codeGenerator.generate(), email, school)
    );

    // @todo : send email

    return voucher.getId();
  }
}
