export class UserAlreadyAddedToSchoolException extends Error {
  constructor() {
    super('users.errors.already_assigned_to_school');
  }
}
