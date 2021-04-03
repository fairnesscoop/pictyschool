export class SchoolUserNotFoundException extends Error {
  constructor() {
    super('schools.users.errors.school_user_not_found');
  }
}
