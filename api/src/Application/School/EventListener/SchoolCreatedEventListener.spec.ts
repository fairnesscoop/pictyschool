import { mock, instance, when, verify, deepEqual } from 'ts-mockito';
import { SchoolCreatedEventListener } from './SchoolCreatedEventListener';
import { SchoolCreatedEvent } from '../Event/SchoolCreatedEvent';
import { ProductRepository } from 'src/Infrastructure/Product/Repository/ProductRepository';
import { CommandBusAdapter } from 'src/Infrastructure/Adapter/CommandBusAdapter';
import { Product } from 'src/Domain/Product/Product.entity';
import { CreateSchoolProductCommand } from '../Command/Product/CreateSchoolProductCommand';

describe('SchoolCreatedEventListener', () => {
  let commandBus: CommandBusAdapter;
  let productRepository: ProductRepository;
  let eventListener: SchoolCreatedEventListener;

  const event = new SchoolCreatedEvent('8a9df044-94a7-4e6c-abd1-ecdd69d788d5');

  beforeEach(() => {
    commandBus = mock(CommandBusAdapter);
    productRepository = mock(ProductRepository);
    eventListener = new SchoolCreatedEventListener(
      instance(commandBus), 
      instance(productRepository)
    );
  });

  it('testSchoolCreatedEventListener', async () => {
    const p1 = mock(Product);
    when(p1.getId()).thenReturn('b783b181-c638-4f8c-ae83-9f61a1ba387e');
    when(p1.getUnitPrice()).thenReturn(10000);

    const p2 = mock(Product);
    when(p2.getId()).thenReturn('45e7dfb8-bd28-4336-a4d0-72fe9fedee4c');
    when(p2.getUnitPrice()).thenReturn(15000);
    when(
      productRepository.findProductsToImport()
    ).thenResolve([instance(p1), instance(p2)]);

    expect(await eventListener.handle(event)).toBeUndefined();

    verify(
      commandBus.execute(
        deepEqual(
          new CreateSchoolProductCommand(
            100,
            100,
            '8a9df044-94a7-4e6c-abd1-ecdd69d788d5',
            'b783b181-c638-4f8c-ae83-9f61a1ba387e'
          )
        )
      )
    ).once();
    verify(
      commandBus.execute(
        deepEqual(
          new CreateSchoolProductCommand(
            150,
            150,
            '8a9df044-94a7-4e6c-abd1-ecdd69d788d5',
            '45e7dfb8-bd28-4336-a4d0-72fe9fedee4c'
          )
        )
      )
    ).once();
  });
});
