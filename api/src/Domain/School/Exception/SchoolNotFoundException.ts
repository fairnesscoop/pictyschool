export class SchoolNotFoundException extends Error {
  constructor() {
    super('schools.errors.not_found');
  }
}
