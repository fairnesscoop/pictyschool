export class UserAlreadyAssignedToSchoolException extends Error {
  constructor() {
    super('users.errors.already_assigned_to_school');
  }
}
