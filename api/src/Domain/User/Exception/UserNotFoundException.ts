export class UserNotFoundException extends Error {
  constructor() {
    super('users.errors.not_found');
  }
}
