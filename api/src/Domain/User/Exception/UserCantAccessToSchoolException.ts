export class UserCantAccessToSchoolException extends Error {
  constructor() {
    super('users.errors.cant_access_to_school');
  }
}
