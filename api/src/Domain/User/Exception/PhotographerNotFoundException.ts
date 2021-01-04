export class PhotographerNotFoundException extends Error {
  constructor() {
    super('users.errors.not_found');
  }
}
