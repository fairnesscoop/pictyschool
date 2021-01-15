export class SchoolProductAlreadyExistException extends Error {
  constructor() {
    super('schools.products.errors.already_exist');
  }
}
