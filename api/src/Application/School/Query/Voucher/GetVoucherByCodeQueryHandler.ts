import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IVoucherRepository } from 'src/Domain/School/Repository/IVoucherRepository';
import { VoucherNotFoundException } from 'src/Domain/School/Exception/VoucherNotFoundException';
import { GetVoucherByCodeQuery } from './GetVoucherByCodeQuery';
import { VoucherView } from '../../View/VoucherView';

@QueryHandler(GetVoucherByCodeQuery)
export class GetVoucherByCodeQueryHandler {
  constructor(
    @Inject('IVoucherRepository')
    private readonly voucherRepository: IVoucherRepository
  ) {}

  public async execute({ code }: GetVoucherByCodeQuery): Promise<VoucherView> {
    const voucher = await this.voucherRepository.findOneByCode(code);

    if (!voucher) {
      throw new VoucherNotFoundException();
    }

    return new VoucherView(
      voucher.getId(),
      voucher.getCode(),
      voucher.getEmail(),
    );
  }
}
