import { mock, instance, when, verify } from 'ts-mockito';
import { ShippingCostRepository } from 'src/Infrastructure/Order/Repository/ShippingCostRepository';
import { ShippingCost } from 'src/Domain/Order/ShippingCost.entity';
import { ShippingCostView } from 'src/Application/Order/View/ShippingCostView';
import { GetShippingCostsQueryHandler } from './GetShippingCostsQueryHandler';
import { GetShippingCostsQuery } from './GetShippingCostsQuery';

describe('GetShippingCostsQueryHandler', () => {
  it('testGetShippingCosts', async () => {
    const shippingcostRepository = mock(ShippingCostRepository);

    const shippingcost1 = mock(ShippingCost);
    when(shippingcost1.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(shippingcost1.getPriceFromCents()).thenReturn(9.99);
    when(shippingcost1.getGrams()).thenReturn(1000);

    const shippingcost2 = mock(ShippingCost);
    when(shippingcost2.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(shippingcost2.getPriceFromCents()).thenReturn(3.99);
    when(shippingcost2.getGrams()).thenReturn(500);

    when(shippingcostRepository.findShippingCosts()).thenResolve([
      instance(shippingcost2), instance(shippingcost1)
    ]);

    const queryHandler = new GetShippingCostsQueryHandler(instance(shippingcostRepository));

    const expectedResult = [
      new ShippingCostView(
        'd54f15d6-1a1d-47e8-8672-9f46018f9960',
        500,
        3.99
      ),
      new ShippingCostView(
        'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
        1000,
        9.99
      )
    ];

    expect(await queryHandler.execute(new GetShippingCostsQuery())).toMatchObject(
      expectedResult
    );
    verify(shippingcostRepository.findShippingCosts()).once();
  });
});
