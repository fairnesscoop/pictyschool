import { mock, instance, when, verify, anything } from 'ts-mockito';
import { LeadRepository } from 'src/Infrastructure/Lead/Repository/LeadRepository';
import { Lead } from 'src/Domain/Lead/Lead.entity';
import { GetLeadByIdQueryHandler } from './GetLeadByIdQueryHandler';
import { GetLeadByIdQuery } from './GetLeadByIdQuery';
import { LeadNotFoundException } from 'src/Domain/Lead/Exception/LeadNotFoundException';
import { LeadView } from '../View/LeadView';

describe('GetLeadByIdQueryHandler', () => {
  const query = new GetLeadByIdQuery('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
  let leadRepository: LeadRepository;
  let queryHandler: GetLeadByIdQueryHandler;
  let lead: Lead;

  beforeEach(() => {
    lead = mock(Lead);
    leadRepository = mock(LeadRepository);
    queryHandler = new GetLeadByIdQueryHandler(instance(leadRepository));
  });

  it('testGetLead', async () => {
    const expectedResult = new LeadView(
      'd54f15d6-1a1d-47e8-8672-9f46018f9960',
      'LM120I',
      'Belliard',
      '127 Rue Belliard',
      '75018',
      'Paris',
      'mathieu@fairness.coop',
      '010101010101',
      200
    );

    when(lead.getName()).thenReturn('Belliard');
    when(lead.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(lead.getReference()).thenReturn('LM120I');
    when(lead.getAddress()).thenReturn('127 Rue Belliard');
    when(lead.getCity()).thenReturn('Paris');
    when(lead.getZipCode()).thenReturn('75018');
    when(lead.getPhoneNumber()).thenReturn('010101010101');
    when(lead.getNumberOfStudents()).thenReturn(200);
    when(lead.getEmail()).thenReturn('mathieu@fairness.coop');
    
    when(
      leadRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(lead));
    expect(await queryHandler.execute(query)).toMatchObject(expectedResult);

    verify(
      leadRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
  });

  it('testGetLeadNotFound', async () => {
    when(
      leadRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(null);

    try {
      expect(await queryHandler.execute(query)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(LeadNotFoundException);
      expect(e.message).toBe('leads.errors.not_found');
      verify(
        leadRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
    }
  });
});
