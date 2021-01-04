export class ProductAlreadyExistException extends Error {
  constructor() {
    super('products.errors.already_exist');
  }
}
