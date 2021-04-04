export class VoucherAlreadyGeneratedException extends Error {
  constructor() {
    super('schools.errors.voucher_already_generated');
  }
}
