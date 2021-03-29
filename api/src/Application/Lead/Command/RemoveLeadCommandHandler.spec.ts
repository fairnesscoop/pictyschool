import { mock, instance, when, verify, anything } from 'ts-mockito';
import { LeadRepository } from 'src/Infrastructure/Lead/Repository/LeadRepository';
import { Lead } from 'src/Domain/Lead/Lead.entity';
import { RemoveLeadCommandHandler } from './RemoveLeadCommandHandler';
import { RemoveLeadCommand } from './RemoveLeadCommand';
import { LeadNotFoundException } from 'src/Domain/Lead/Exception/LeadNotFoundException';

describe('RemoveLeadCommandHandler', () => {
  let leadRepository: LeadRepository;
  let removedLead: Lead;
  let handler: RemoveLeadCommandHandler;

  const command = new RemoveLeadCommand('17efcbee-bd2f-410e-9e99-51684b592bad');

  beforeEach(() => {
    leadRepository = mock(LeadRepository);
    removedLead = mock(Lead);

    handler = new RemoveLeadCommandHandler(
      instance(leadRepository)
    );
  });

  it('testLeadRemovedSuccessfully', async () => {
    when(leadRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(instance(removedLead));
    when(removedLead.getId()).thenReturn(
      '17efcbee-bd2f-410e-9e99-51684b592bad'
    );
    when(
      leadRepository.save(instance(removedLead))
    ).thenResolve(instance(removedLead));

    await handler.execute(command);

    verify(
      leadRepository.remove(instance(removedLead))
    ).once();
    verify(leadRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
  });

  it('testLeadNotFound', async () => {
    when(leadRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(LeadNotFoundException);
      expect(e.message).toBe('leads.errors.not_found');
      verify(leadRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
      verify(leadRepository.remove(anything())).never();
    }
  });
});
