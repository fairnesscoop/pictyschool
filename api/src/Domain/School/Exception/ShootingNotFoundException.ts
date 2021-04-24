export class ShootingNotFoundException extends Error {
  constructor() {
    super('schools.shootings.errors.not_found');
  }
}
