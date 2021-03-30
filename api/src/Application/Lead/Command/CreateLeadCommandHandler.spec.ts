import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { LeadRepository } from 'src/Infrastructure/Lead/Repository/LeadRepository';
import { IsLeadAlreadyExist } from 'src/Domain/Lead/Specification/IsLeadAlreadyExist';
import { Lead } from 'src/Domain/Lead/Lead.entity';
import { CreateLeadCommandHandler } from 'src/Application/Lead/Command/CreateLeadCommandHandler';
import { CreateLeadCommand } from 'src/Application/Lead/Command/CreateLeadCommand';
import { LeadAlreadyExistException } from 'src/Domain/Lead/Exception/LeadAlreadyExistException';
import { Status, Type } from 'src/Domain/School/AbstractSchool';

describe('CreateLeadCommandHandler', () => {
  let leadRepository: LeadRepository;
  let isLeadAlreadyExist: IsLeadAlreadyExist;
  let createdLead: Lead;
  let handler: CreateLeadCommandHandler;

  const command = new CreateLeadCommand(
    'LM120I',
    'Belliard',
    '127 Rue Belliard',
    '75018',
    'Paris',
    'test@test.com',
    '010101010101',
    Status.PRIVATE,
    Type.ELEMENTARY,
    200
  );

  beforeEach(() => {
    leadRepository = mock(LeadRepository);
    isLeadAlreadyExist = mock(IsLeadAlreadyExist);
    createdLead = mock(Lead);

    handler = new CreateLeadCommandHandler(
      instance(leadRepository),
      instance(isLeadAlreadyExist)
    );
  });

  it('testLeadCreatedSuccessfully', async () => {
    when(isLeadAlreadyExist.isSatisfiedBy('LM120I')).thenResolve(false);
    when(createdLead.getId()).thenReturn(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );
    when(
      leadRepository.save(
        deepEqual(
          new Lead(
            'LM120I',
            'Belliard',
            '127 Rue Belliard',
            '75018',
            'Paris',
            Status.PRIVATE,
            Type.ELEMENTARY,
            'test@test.com',
            '010101010101',
            200
          )
        )
      )
    ).thenResolve(instance(createdLead));

    expect(await handler.execute(command)).toBe(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );

    verify(isLeadAlreadyExist.isSatisfiedBy('LM120I')).once();
    verify(
      leadRepository.save(
        deepEqual(
          new Lead(
            'LM120I',
            'Belliard',
            '127 Rue Belliard',
            '75018',
            'Paris',
            Status.PRIVATE,
            Type.ELEMENTARY,
            'test@test.com',
            '010101010101',
            200
          )
        )
      )
    ).once();
    verify(createdLead.getId()).once();
  });

  it('testLeadAlreadyExist', async () => {
    when(isLeadAlreadyExist.isSatisfiedBy('LM120I')).thenResolve(true);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(LeadAlreadyExistException);
      expect(e.message).toBe('leads.errors.already_exist');
      verify(isLeadAlreadyExist.isSatisfiedBy('LM120I')).once();
      verify(leadRepository.save(anything())).never();
      verify(createdLead.getId()).never();
    }
  });
});
