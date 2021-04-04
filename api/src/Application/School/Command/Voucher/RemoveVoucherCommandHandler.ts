import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { VoucherNotFoundException } from 'src/Domain/School/Exception/VoucherNotFoundException';
import { IVoucherRepository } from 'src/Domain/School/Repository/IVoucherRepository';
import { RemoveVoucherCommand } from './RemoveVoucherCommand';

@CommandHandler(RemoveVoucherCommand)
export class RemoveVoucherCommandHandler {
  constructor(
    @Inject('IVoucherRepository')
    private readonly voucherRepository: IVoucherRepository,
  ) {}

  public async execute({ id }: RemoveVoucherCommand): Promise<void> {
    const voucher = await this.voucherRepository.findOneById(id);

    if (!voucher) {
      throw new VoucherNotFoundException();
    }

    await this.voucherRepository.remove(voucher);
  }
}
