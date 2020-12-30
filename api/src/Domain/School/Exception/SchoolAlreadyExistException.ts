export class SchoolAlreadyExistException extends Error {
  constructor() {
    super('school.errors.already_exist');
  }
}
