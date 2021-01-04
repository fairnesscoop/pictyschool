export class ProductNotFoundException extends Error {
  constructor() {
    super('products.errors.not_found');
  }
}
