export class ShippingCostNotFoundException extends Error {
  constructor() {
    super('shipping_costs.errors.not_found');
  }
}
