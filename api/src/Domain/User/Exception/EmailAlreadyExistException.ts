export class EmailAlreadyExistException extends Error {
  constructor() {
    super('users.errors.email_already_exist');
  }
}
