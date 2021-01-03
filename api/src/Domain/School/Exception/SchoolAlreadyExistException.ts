export class SchoolAlreadyExistException extends Error {
  constructor() {
    super('schools.errors.already_exist');
  }
}
