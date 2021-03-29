export class LeadNotFoundException extends Error {
  constructor() {
    super('leads.errors.not_found');
  }
}
