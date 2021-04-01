export class CantRemoveYourselfException extends Error {
  constructor() {
    super('users.errors.cant_remove_yourself');
  }
}
