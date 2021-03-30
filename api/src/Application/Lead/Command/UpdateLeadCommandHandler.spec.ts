import { mock, instance, when, verify, anything } from 'ts-mockito';
import { UpdateLeadCommandHandler } from './UpdateLeadCommandHandler';
import { UpdateLeadCommand } from './UpdateLeadCommand';
import { LeadRepository } from 'src/Infrastructure/Lead/Repository/LeadRepository';
import { IsLeadAlreadyExist } from 'src/Domain/Lead/Specification/IsLeadAlreadyExist';
import { Lead } from 'src/Domain/Lead/Lead.entity';
import { LeadAlreadyExistException } from 'src/Domain/Lead/Exception/LeadAlreadyExistException';
import { LeadNotFoundException } from 'src/Domain/Lead/Exception/LeadNotFoundException';

describe('UpdateLeadCommandHandler', () => {
  let leadRepository: LeadRepository;
  let isLeadAlreadyExist: IsLeadAlreadyExist;
  let handler: UpdateLeadCommandHandler;

  const lead = mock(Lead);
  const command = new UpdateLeadCommand(
    '8a9df044-94a7-4e6c-abd1-ecdd69d788d5',
    'LM120I',
    'Belliard',
    '127 Rue Belliard',
    '75018',
    'Paris',
    'test@test.com',
    '010101010101',
    200
  );

  beforeEach(() => {
    leadRepository = mock(LeadRepository);
    isLeadAlreadyExist = mock(IsLeadAlreadyExist);
    handler = new UpdateLeadCommandHandler(
      instance(leadRepository),
      instance(isLeadAlreadyExist)
    );
  });

  it('testLeadNotFound', async () => {
    when(
      leadRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(LeadNotFoundException);
      expect(e.message).toBe('leads.errors.not_found');
      verify(
        leadRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
      ).once();
      verify(isLeadAlreadyExist.isSatisfiedBy(anything())).never();
      verify(leadRepository.save(anything())).never();
      verify(
        lead.update(anything(), anything(), anything(), anything(), anything(), anything(), anything())
      ).never();
    }
  });

  it('testLeadAlreadyExist', async () => {
    when(lead.getReference()).thenReturn('abc');
    when(
      leadRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(instance(lead));
    when(
      isLeadAlreadyExist.isSatisfiedBy('LM120I')
    ).thenResolve(true);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(LeadAlreadyExistException);
      expect(e.message).toBe('leads.errors.already_exist');
      verify(
        isLeadAlreadyExist.isSatisfiedBy('LM120I')
      ).once();
      verify(
        lead.update(anything(), anything(), anything(), anything(), anything(), anything(), anything())
      ).never();
      verify(leadRepository.save(anything())).never();
    }
  });

  it('testSuccessfullyUpdated', async () => {
    when(lead.getId()).thenReturn('8a9df044-94a7-4e6c-abd1-ecdd69d788d5');
    when(lead.getReference()).thenReturn('LM120I');
    when(
      leadRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(instance(lead));

    expect(await handler.execute(command)).toBe(
      '8a9df044-94a7-4e6c-abd1-ecdd69d788d5'
    );

    verify(isLeadAlreadyExist.isSatisfiedBy(anything())).never();
    verify(
      lead.update(
        'LM120I',
        'Belliard',
        '127 Rue Belliard',
        '75018',
        'Paris',
        'test@test.com',
        '010101010101',
        200
      )
    ).calledBefore(leadRepository.save(instance(lead)));
    verify(leadRepository.save(instance(lead))).once();
  });
});
