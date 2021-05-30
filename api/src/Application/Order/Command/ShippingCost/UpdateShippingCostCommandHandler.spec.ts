import { mock, instance, when, verify, anything } from 'ts-mockito';
import { ShippingCostRepository } from 'src/Infrastructure/Order/Repository/ShippingCostRepository';
import { IsShippingCostAlreadyExist } from 'src/Domain/Order/Specification/IsShippingCostAlreadyExist';
import { ShippingCost } from 'src/Domain/Order/ShippingCost.entity';
import { ShippingCostNotFoundException } from 'src/Domain/Order/Exception/ShippingCostNotFoundException';
import { ShippingCostAlreadyExistException } from 'src/Domain/Order/Exception/ShippingCostAlreadyExistException';
import { UpdateShippingCostCommandHandler } from './UpdateShippingCostCommandHandler';
import { UpdateShippingCostCommand } from './UpdateShippingCostCommand';

describe('UpdateShippingCostCommandHandler', () => {
  let shippingcostRepository: ShippingCostRepository;
  let isShippingCostAlreadyExist: IsShippingCostAlreadyExist;

  let handler: UpdateShippingCostCommandHandler;

  const shippingcost = mock(ShippingCost);
  const command = new UpdateShippingCostCommand(
    '8a9df044-94a7-4e6c-abd1-ecdd69d788d5',
    1000,
    9.99
  );

  beforeEach(() => {
    shippingcostRepository = mock(ShippingCostRepository);
    isShippingCostAlreadyExist = mock(IsShippingCostAlreadyExist);
    handler = new UpdateShippingCostCommandHandler(
      instance(shippingcostRepository),
      instance(isShippingCostAlreadyExist)
    );
  });

  it('testShippingCostNotFound', async () => {
    when(
      shippingcostRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(ShippingCostNotFoundException);
      expect(e.message).toBe('shipping_costs.errors.not_found');
      verify(
        shippingcostRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
      ).once();
      verify(isShippingCostAlreadyExist.isSatisfiedBy(anything())).never();
      verify(shippingcostRepository.save(anything())).never();
      verify(
        shippingcost.update(anything(), anything())
      ).never();
    }
  });

  it('testShippingCostAlreadyExist', async () => {
    when(shippingcost.getWeight()).thenReturn(100);
    when(
      shippingcostRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(instance(shippingcost));
    when(isShippingCostAlreadyExist.isSatisfiedBy(1000)).thenResolve(true);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(ShippingCostAlreadyExistException);
      expect(e.message).toBe('shipping_costs.errors.already_exist');
      verify(
        shippingcostRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
      ).once();
      verify(
        isShippingCostAlreadyExist.isSatisfiedBy(1000)
      ).once();
      verify(
        shippingcost.update(anything(), anything())
      ).never();
      verify(shippingcostRepository.save(anything())).never();
    }
  });

  it('testSuccessfullyUpdated', async () => {
    when(shippingcost.getId()).thenReturn('8a9df044-94a7-4e6c-abd1-ecdd69d788d5');
    when(shippingcost.getWeight()).thenReturn(1000);
    when(
      shippingcostRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(instance(shippingcost));

    expect(await handler.execute(command)).toBe(
      '8a9df044-94a7-4e6c-abd1-ecdd69d788d5'
    );

    verify(isShippingCostAlreadyExist.isSatisfiedBy(anything())).never();
    verify(
      shippingcost.update(
        1000,
        999
      )
    ).calledBefore(shippingcostRepository.save(instance(shippingcost)));
    verify(shippingcostRepository.save(instance(shippingcost))).once();
  });
});
