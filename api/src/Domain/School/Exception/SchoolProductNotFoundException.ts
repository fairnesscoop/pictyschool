export class SchoolProductNotFoundException extends Error {
  constructor() {
    super('school_products.errors.not_found');
  }
}
