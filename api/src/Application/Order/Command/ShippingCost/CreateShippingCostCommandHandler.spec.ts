import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { ShippingCostRepository } from 'src/Infrastructure/Order/Repository/ShippingCostRepository';
import { IsShippingCostAlreadyExist } from 'src/Domain/Order/Specification/IsShippingCostAlreadyExist';
import { ShippingCost } from 'src/Domain/Order/ShippingCost.entity';
import { ShippingCostAlreadyExistException } from 'src/Domain/Order/Exception/ShippingCostAlreadyExistException';
import { CreateShippingCostCommandHandler } from './CreateShippingCostCommandHandler';
import { CreateShippingCostCommand } from './CreateShippingCostCommand';

describe('CreateShippingCostCommandHandler', () => {
  let shippingcostRepository: ShippingCostRepository;
  let isShippingCostAlreadyExist: IsShippingCostAlreadyExist;
  let createdShippingCost: ShippingCost;
  let handler: CreateShippingCostCommandHandler;

  const command = new CreateShippingCostCommand(
    1000,
    9.99,
  );

  beforeEach(() => {
    shippingcostRepository = mock(ShippingCostRepository);
    isShippingCostAlreadyExist = mock(IsShippingCostAlreadyExist);
    createdShippingCost = mock(ShippingCost);

    handler = new CreateShippingCostCommandHandler(
      instance(shippingcostRepository),
      instance(isShippingCostAlreadyExist)
    );
  });

  it('testShippingCostCreatedSuccessfully', async () => {
    when(isShippingCostAlreadyExist.isSatisfiedBy(1000)).thenResolve(false);
    when(createdShippingCost.getId()).thenReturn(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );
    when(
      shippingcostRepository.save(deepEqual(new ShippingCost(1000,999)))
    ).thenResolve(instance(createdShippingCost));

    expect(await handler.execute(command)).toBe(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );

    verify(isShippingCostAlreadyExist.isSatisfiedBy(1000)).once();
    verify(
      shippingcostRepository.save(deepEqual(new ShippingCost(1000, 999)))
    ).once();
    verify(createdShippingCost.getId()).once();
  });

  it('testShippingCostAlreadyExist', async () => {
    when(isShippingCostAlreadyExist.isSatisfiedBy(1000)).thenResolve(true);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(ShippingCostAlreadyExistException);
      expect(e.message).toBe('shipping_costs.errors.already_exist');
      verify(isShippingCostAlreadyExist.isSatisfiedBy(1000)).once();
      verify(shippingcostRepository.save(anything())).never();
      verify(createdShippingCost.getId()).never();
    }
  });
});
