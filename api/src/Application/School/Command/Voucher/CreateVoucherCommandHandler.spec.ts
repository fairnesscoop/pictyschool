import { mock, instance, when, verify, anything, deepEqual } from 'ts-mockito';
import { VoucherRepository } from 'src/Infrastructure/School/Repository/VoucherRepository';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { School } from 'src/Domain/School/School.entity';
import { Voucher } from 'src/Domain/School/Voucher.entity';
import { CodeGeneratorAdapter } from 'src/Infrastructure/Adapter/CodeGeneratorAdapter';
import { CreateVoucherCommand } from './CreateVoucherCommand';
import { CreateVoucherCommandHandler } from './CreateVoucherCommandHandler';
import { IsVoucherAlreadyGenerated } from 'src/Domain/School/Specification/IsVoucherAlreadyGenerated';
import { VoucherAlreadyGeneratedException } from 'src/Domain/School/Exception/VoucherAlreadyGeneratedException';

describe('CreateVouchersCommandHandler', () => {
  let voucherRepository: VoucherRepository;
  let schoolRepository: SchoolRepository;
  let codeGenerator: CodeGeneratorAdapter;
  let isVoucherAlreadyGenerated: IsVoucherAlreadyGenerated;
  let commandHandler: CreateVoucherCommandHandler;

  const school = mock(School);
  const command = new CreateVoucherCommand(
    'a18c2b89-3a52-4a5e-ba0a-4545e62c160c',
    'mathieu.marchois@gmail.com'
  );

  beforeEach(() => {
    voucherRepository = mock(VoucherRepository);
    schoolRepository = mock(SchoolRepository);
    isVoucherAlreadyGenerated = mock(IsVoucherAlreadyGenerated);
    codeGenerator = mock(CodeGeneratorAdapter);

    commandHandler = new CreateVoucherCommandHandler(
      instance(voucherRepository),
      instance(schoolRepository),
      instance(codeGenerator),
      instance(isVoucherAlreadyGenerated),
    );
  });

  it('testSchoolNotFound', async () => {
    when(
      schoolRepository.findOneById('a18c2b89-3a52-4a5e-ba0a-4545e62c160c')
    ).thenResolve(null);
    try {
      expect(await commandHandler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolNotFoundException);
      expect(e.message).toBe('schools.errors.not_found');
      verify(
        schoolRepository.findOneById('a18c2b89-3a52-4a5e-ba0a-4545e62c160c')
      ).once();
      verify(codeGenerator.generate()).never();
      verify(voucherRepository.save(anything())).never();
      verify(isVoucherAlreadyGenerated.isSatisfiedBy(anything(), anything())).never();
    }
  });

  it('testVoucherAlreadyGenerated', async () => {
    when(
      schoolRepository.findOneById('a18c2b89-3a52-4a5e-ba0a-4545e62c160c')
    ).thenResolve(instance(school));
    when(isVoucherAlreadyGenerated.isSatisfiedBy('mathieu.marchois@gmail.com', instance(school)))
      .thenResolve(true);

    try {
      expect(await commandHandler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(VoucherAlreadyGeneratedException);
      expect(e.message).toBe('schools.errors.voucher_already_generated');
      verify(
        schoolRepository.findOneById('a18c2b89-3a52-4a5e-ba0a-4545e62c160c')
      ).once();
      verify(codeGenerator.generate()).never();
      verify(voucherRepository.save(anything())).never();
      verify(isVoucherAlreadyGenerated.isSatisfiedBy('mathieu.marchois@gmail.com', instance(school)))
      .once();
    }    
  });

  it('testCreateVoucher', async () => {
    const savedVoucher = mock(Voucher);
    when(savedVoucher.getId()).thenReturn('f789cc01-974e-439e-812e-98817cce2496');
    when(
      schoolRepository.findOneById('a18c2b89-3a52-4a5e-ba0a-4545e62c160c')
    ).thenResolve(instance(school));
    when(isVoucherAlreadyGenerated.isSatisfiedBy('mathieu.marchois@gmail.com', instance(school)))
      .thenResolve(false);
    when(codeGenerator.generate()).thenReturn('xZijDk');
    when(voucherRepository.save(
      deepEqual(
          new Voucher('xZijDk', 'mathieu.marchois@gmail.com', instance(school))
        ))
    ).thenResolve(instance(savedVoucher));

    expect(await commandHandler.execute(command)).toBe('f789cc01-974e-439e-812e-98817cce2496');

    verify(schoolRepository.findOneById('a18c2b89-3a52-4a5e-ba0a-4545e62c160c')).once();
    verify(codeGenerator.generate()).once();
    verify(isVoucherAlreadyGenerated.isSatisfiedBy('mathieu.marchois@gmail.com', instance(school)))
      .once();
    verify(
      voucherRepository.save(
        deepEqual(
          new Voucher('xZijDk', 'mathieu.marchois@gmail.com', instance(school))
        )
      )
    ).once();
  });
});
