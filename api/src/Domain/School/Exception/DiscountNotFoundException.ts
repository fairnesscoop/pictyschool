export class DiscountNotFoundException extends Error {
  constructor() {
    super('schools.discounts.errors.not_found');
  }
}
