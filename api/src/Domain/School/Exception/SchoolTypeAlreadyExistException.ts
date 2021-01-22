export class SchoolTypeAlreadyExistException extends Error {
  constructor() {
    super('schools.types.errors.already_exist');
  }
}
