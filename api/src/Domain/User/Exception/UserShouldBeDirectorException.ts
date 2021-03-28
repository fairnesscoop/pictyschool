export class UserShouldBeDirectorException extends Error {
  constructor() {
    super('users.errors.should_be_director');
  }
}
