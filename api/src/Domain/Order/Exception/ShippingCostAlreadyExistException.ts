export class ShippingCostAlreadyExistException extends Error {
  constructor() {
    super('shipping_costs.errors.already_exist');
  }
}
