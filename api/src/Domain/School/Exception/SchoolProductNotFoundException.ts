export class SchoolProductNotFoundException extends Error {
  constructor() {
    super('schools.products.errors.not_found');
  }
}
