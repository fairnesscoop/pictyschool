export class SchoolTypeNotFoundException extends Error {
  constructor() {
    super('schools.types.errors.not_found');
  }
}
