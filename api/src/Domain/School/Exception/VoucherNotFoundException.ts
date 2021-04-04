export class VoucherNotFoundException extends Error {
  constructor() {
    super('schools.errors.voucher_not_found');
  }
}
