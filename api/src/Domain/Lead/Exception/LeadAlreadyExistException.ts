export class LeadAlreadyExistException extends Error {
  constructor() {
    super('leads.errors.already_exist');
  }
}
