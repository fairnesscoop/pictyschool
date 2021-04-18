import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { DiscountRepository } from 'src/Infrastructure/School/Repository/DiscountRepository';
import { Discount, DiscountType } from 'src/Domain/School/Discount.entity';
import { CreateDiscountCommandHandler } from './CreateDiscountCommandHandler';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { CreateDiscountCommand } from './CreateDiscountCommand';
import { School } from 'src/Domain/School/School.entity';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { IsDiscountAlreadyExist } from 'src/Domain/School/Specification/Discount/IsDiscountAlreadyExist';
import { DiscountAlreadyExistException } from 'src/Domain/School/Exception/DiscountAlreadyExistException';

describe('CreateDiscountCommandHandler', () => {
  let schoolRepository: SchoolRepository;
  let isDiscountAlreadyExist: IsDiscountAlreadyExist;
  let discountRepository: DiscountRepository;
  let createdDiscount: Discount;
  let handler: CreateDiscountCommandHandler;

  const school = mock(School);
  const command = new CreateDiscountCommand(
    DiscountType.PERCENT,
    100,
    10,
    '553e2b3c-eb11-42b1-8f76-903add071ca7',
  );

  beforeEach(() => {
    schoolRepository = mock(SchoolRepository);
    discountRepository = mock(DiscountRepository);
    isDiscountAlreadyExist = mock(IsDiscountAlreadyExist);
    createdDiscount = mock(Discount);

    handler = new CreateDiscountCommandHandler(
      instance(schoolRepository),
      instance(discountRepository),
      instance(isDiscountAlreadyExist)
    );
  });

  it('testDiscountCreatedSuccessfully', async () => {
    when(schoolRepository.findOneById('553e2b3c-eb11-42b1-8f76-903add071ca7'))
      .thenResolve(instance(school));
    when(createdDiscount.getId()).thenReturn(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );
    when(isDiscountAlreadyExist.isSatisfiedBy(10000, instance(school)))
      .thenResolve(false);
    when(
      discountRepository.save(
        deepEqual(
          new Discount(
            DiscountType.PERCENT,
            10000,
            1000,
            instance(school),
          )
        )
      )
    ).thenResolve(instance(createdDiscount));

    expect(await handler.execute(command)).toBe(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );

    verify(
      discountRepository.save(
        deepEqual(
          new Discount(
            DiscountType.PERCENT,
            10000,
            1000,
            instance(school),
          )
        )
      )
    ).once();
    verify(isDiscountAlreadyExist.isSatisfiedBy(10000, instance(school))).once();
    verify(createdDiscount.getId()).once();
    verify(schoolRepository.findOneById('553e2b3c-eb11-42b1-8f76-903add071ca7')).once();
  });

  it('testDiscountAlreadyExistSchoolNotFound', async () => {
    when(schoolRepository.findOneById('553e2b3c-eb11-42b1-8f76-903add071ca7'))
      .thenResolve(instance(school));
    when(isDiscountAlreadyExist.isSatisfiedBy(10000, instance(school)))
      .thenResolve(true);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(DiscountAlreadyExistException);
      expect(e.message).toBe('schools.discounts.errors.already_exist');
      verify(schoolRepository.findOneById('553e2b3c-eb11-42b1-8f76-903add071ca7')).once();
      verify(discountRepository.save(anything())).never();
      verify(isDiscountAlreadyExist.isSatisfiedBy(10000, instance(school))).once();
      verify(createdDiscount.getId()).never();
    }
  });

  it('testSchoolNotFound', async () => {
    when(schoolRepository.findOneById('553e2b3c-eb11-42b1-8f76-903add071ca7'))
      .thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolNotFoundException);
      expect(e.message).toBe('schools.errors.not_found');
      verify(schoolRepository.findOneById('553e2b3c-eb11-42b1-8f76-903add071ca7')).once();
      verify(discountRepository.save(anything())).never();
      verify(isDiscountAlreadyExist.isSatisfiedBy(anything(), anything())).never();
      verify(createdDiscount.getId()).never();
    }
  });
});
