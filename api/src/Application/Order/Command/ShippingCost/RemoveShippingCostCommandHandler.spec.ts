import { mock, instance, when, verify, anything } from 'ts-mockito';
import { ShippingCostRepository } from 'src/Infrastructure/Order/Repository/ShippingCostRepository';
import { ShippingCost } from 'src/Domain/Order/ShippingCost.entity';
import { RemoveShippingCostCommandHandler } from './RemoveShippingCostCommandHandler';
import { RemoveShippingCostCommand } from './RemoveShippingCostCommand';
import { ShippingCostNotFoundException } from 'src/Domain/Order/Exception/ShippingCostNotFoundException';

describe('RemoveShippingCostCommandHandler', () => {
  let shippingcostRepository: ShippingCostRepository;
  let removedShippingCost: ShippingCost;
  let handler: RemoveShippingCostCommandHandler;

  const command = new RemoveShippingCostCommand('17efcbee-bd2f-410e-9e99-51684b592bad');

  beforeEach(() => {
    shippingcostRepository = mock(ShippingCostRepository);
    removedShippingCost = mock(ShippingCost);

    handler = new RemoveShippingCostCommandHandler(
      instance(shippingcostRepository)
    );
  });

  it('testShippingCostRemovedSuccessfully', async () => {
    when(shippingcostRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(instance(removedShippingCost));

    await handler.execute(command);

    verify(
      shippingcostRepository.remove(instance(removedShippingCost))
    ).once();
    verify(shippingcostRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
  });

  it('testShippingCostNotFound', async () => {
    when(shippingcostRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(ShippingCostNotFoundException);
      expect(e.message).toBe('shipping_costs.errors.not_found');
      verify(shippingcostRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
      verify(shippingcostRepository.remove(anything())).never();
    }
  });
});
