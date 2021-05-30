import { mock, instance, when, verify } from 'ts-mockito';
import { GetShippingCostByIdQueryHandler } from './GetShippingCostByIdQueryHandler';
import { GetShippingCostByIdQuery } from './GetShippingCostByIdQuery';
import { ShippingCostRepository } from 'src/Infrastructure/Order/Repository/ShippingCostRepository';
import { ShippingCostView } from '../../View/ShippingCostView';
import { ShippingCost } from 'src/Domain/Order/ShippingCost.entity';
import { ShippingCostNotFoundException } from 'src/Domain/Order/Exception/ShippingCostNotFoundException';

describe('GetShippingCostByIdQueryHandler', () => {
  const query = new GetShippingCostByIdQuery('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');

  it('testGetShippingCost', async () => {
    const shippingcostRepository = mock(ShippingCostRepository);
    const queryHandler = new GetShippingCostByIdQueryHandler(instance(shippingcostRepository));
    const expectedResult = new ShippingCostView(
      'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
      1000,
      9.99
    );

    const shippingcost = mock(ShippingCost);
    when(shippingcost.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(shippingcost.getWeight()).thenReturn(1000);
    when(shippingcost.getPriceFromCents()).thenReturn(9.99);
    when(
      shippingcostRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(shippingcost));

    expect(await queryHandler.execute(query)).toMatchObject(expectedResult);

    verify(
      shippingcostRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
  });

  it('testGetShippingCostNotFound', async () => {
    const shippingcostRepository = mock(ShippingCostRepository);
    const queryHandler = new GetShippingCostByIdQueryHandler(instance(shippingcostRepository));
    when(
      shippingcostRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(null);

    try {
      expect(await queryHandler.execute(query)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(ShippingCostNotFoundException);
      expect(e.message).toBe('shipping_costs.errors.not_found');
      verify(
        shippingcostRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
    }
  });
});
