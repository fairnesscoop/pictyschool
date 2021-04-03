import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSchoolVouchersQuery } from './GetSchoolVouchersQuery';
import { IVoucherRepository } from 'src/Domain/School/Repository/IVoucherRepository';
import { SchoolUserView } from '../../View/SchoolUserView';

@QueryHandler(GetSchoolVouchersQuery)
export class GetSchoolVouchersQueryHandler {
  constructor(
    @Inject('IVoucherRepository')
    private readonly voucherRepository: IVoucherRepository
  ) {}

  public async execute(query: GetSchoolVouchersQuery): Promise<SchoolUserView[]> {
    const schoolUserViews: SchoolUserView[] = [];
    const vouchers = await this.voucherRepository.findBySchool(query.schoolId);

    for (const voucher of vouchers) {
      schoolUserViews.push(
        new SchoolUserView(
          voucher.getId(),
          voucher.getEmail(),
          'voucher'
        )
      );
    }

    return schoolUserViews;
  }
}
