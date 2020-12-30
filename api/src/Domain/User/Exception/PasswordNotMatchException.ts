export class PasswordNotMatchException extends Error {
  constructor() {
    super('users.errors.password_not_match');
  }
}
