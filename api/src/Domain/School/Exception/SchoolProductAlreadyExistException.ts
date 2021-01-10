export class SchoolProductAlreadyExistException extends Error {
  constructor() {
    super('school_products.errors.already_exist');
  }
}
