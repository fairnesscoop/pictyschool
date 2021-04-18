export class DiscountAlreadyExistException extends Error {
  constructor() {
    super('schools.discounts.errors.already_exist');
  }
}
