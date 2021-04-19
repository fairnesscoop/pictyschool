import { mock, instance, when, verify, anything } from 'ts-mockito';
import { Discount } from 'src/Domain/School/Discount.entity';
import { DiscountNotFoundException } from 'src/Domain/School/Exception/DiscountNotFoundException';
import { DiscountRepository } from 'src/Infrastructure/School/Repository/DiscountRepository';
import { RemoveDiscountCommand } from './RemoveDiscountCommand';
import { RemoveDiscountCommandHandler } from './RemoveDiscountCommandHandler';

describe('RemoveDiscountCommandHandler', () => {
  let discountRepository: DiscountRepository;
  let removedDiscount: Discount;
  let handler: RemoveDiscountCommandHandler;

  const command = new RemoveDiscountCommand('17efcbee-bd2f-410e-9e99-51684b592bad');

  beforeEach(() => {
    discountRepository = mock(DiscountRepository);
    removedDiscount = mock(Discount);

    handler = new RemoveDiscountCommandHandler(
      instance(discountRepository)
    );
  });

  it('testDiscountRemovedSuccessfully', async () => {
    when(discountRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(instance(removedDiscount));
    await handler.execute(command);

    verify(
      discountRepository.remove(instance(removedDiscount))
    ).once();
    verify(discountRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
  });

  it('testDiscountNotFound', async () => {
    when(discountRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(DiscountNotFoundException);
      expect(e.message).toBe('schools.discounts.errors.not_found');
      verify(discountRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
      verify(discountRepository.remove(anything())).never();
    }
  });
});
