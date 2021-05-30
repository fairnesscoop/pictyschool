import { mock, instance, when, verify } from 'ts-mockito';
import { IsShippingCostAlreadyExist } from 'src/Domain/Order/Specification/IsShippingCostAlreadyExist';
import { ShippingCost } from 'src/Domain/Order/ShippingCost.entity';
import { ShippingCostRepository } from 'src/Infrastructure/Order/Repository/ShippingCostRepository';

describe('IsShippingCostAlreadyExist', () => {
  let shippingCostRepository: ShippingCostRepository;
  let isShippingCostAlreadyExist: IsShippingCostAlreadyExist;

  beforeEach(() => {
    shippingCostRepository = mock(ShippingCostRepository);
    isShippingCostAlreadyExist = new IsShippingCostAlreadyExist(
      instance(shippingCostRepository)
    );
  });

  it('testShippingCostAlreadyExist', async () => {
    when(shippingCostRepository.findOneByGrams(100)).thenResolve(
      new ShippingCost(100, 99)
    );
    expect(await isShippingCostAlreadyExist.isSatisfiedBy(100)).toBe(
      true
    );
    verify(shippingCostRepository.findOneByGrams(100)).once();
  });

  it('testShippingCostDontExist', async () => {
    when(shippingCostRepository.findOneByGrams(100)).thenResolve(null);
    expect(await isShippingCostAlreadyExist.isSatisfiedBy(100)).toBe(
      false
    );
    verify(shippingCostRepository.findOneByGrams(100)).once();
  });
});
