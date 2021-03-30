import { mock, instance, when, verify, anything } from 'ts-mockito';
import { LeadRepository } from 'src/Infrastructure/Lead/Repository/LeadRepository';
import { IsLeadAlreadyExist } from 'src/Domain/Lead/Specification/IsLeadAlreadyExist';
import { Lead } from 'src/Domain/Lead/Lead.entity';

describe('IsLeadAlreadyExist', () => {
  let leadRepository: LeadRepository;
  let isLeadAlreadyExist: IsLeadAlreadyExist;

  beforeEach(() => {
    leadRepository = mock(LeadRepository);
    isLeadAlreadyExist = new IsLeadAlreadyExist(
      instance(leadRepository)
    );
  });

  it('testLeadAlreadyExist', async () => {
    when(leadRepository.findOneByRef('xjsoi2')).thenResolve(
      new Lead(anything(), anything(), anything(), anything(), anything(), anything(), anything(), anything(), anything())
    );
    expect(await isLeadAlreadyExist.isSatisfiedBy('xjsoi2')).toBe(
      true
    );
    verify(leadRepository.findOneByRef('xjsoi2')).once();
  });

  it('testLeadDontExist', async () => {
    when(leadRepository.findOneByRef('xjsoi2')).thenResolve(null);
    expect(await isLeadAlreadyExist.isSatisfiedBy('xjsoi2')).toBe(
      false
    );
    verify(leadRepository.findOneByRef('xjsoi2')).once();
  });
});
