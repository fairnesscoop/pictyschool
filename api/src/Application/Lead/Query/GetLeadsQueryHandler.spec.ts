import { mock, instance, when, verify } from 'ts-mockito';
import { GetLeadsQueryHandler } from 'src/Application/Lead/Query/GetLeadsQueryHandler';
import { LeadRepository } from 'src/Infrastructure/Lead/Repository/LeadRepository';
import { GetLeadsQuery } from 'src/Application/Lead/Query/GetLeadsQuery';
import { Lead } from 'src/Domain/Lead/Lead.entity';
import { LeadView } from 'src/Application/Lead/View/LeadView';
import { Pagination } from 'src/Application/Common/Pagination';
import { Status, Type } from 'src/Domain/School/AbstractSchool';

describe('GetLeadsQueryHandler', () => {
  it('testGetLeads', async () => {
    const leadRepository = mock(LeadRepository);

    const lead1 = mock(Lead);
    when(lead1.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(lead1.getName()).thenReturn('Ecole élementaire Belliard');
    when(lead1.getReference()).thenReturn('xLKJSs');
    when(lead1.getAddress()).thenReturn('127 Rue Belliard');
    when(lead1.getCity()).thenReturn('Paris');
    when(lead1.getZipCode()).thenReturn('75010');
    when(lead1.getEmail()).thenReturn('email@email.com');
    when(lead1.getPhoneNumber()).thenReturn('0102030405');
    when(lead1.getNumberOfStudents()).thenReturn(200);
    when(lead1.getStatus()).thenReturn(Status.PRIVATE);
    when(lead1.getType()).thenReturn(Type.ELEMENTARY);
    
    const lead2 = mock(Lead);
    when(lead2.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(lead2.getName()).thenReturn('Ecole Primaire les Landes');
    when(lead2.getReference()).thenReturn('abcDes');
    when(lead2.getAddress()).thenReturn('12 Rue des Lampes');
    when(lead2.getCity()).thenReturn('Paris');
    when(lead2.getZipCode()).thenReturn('75018');
    when(lead2.getEmail()).thenReturn('email2@email.com');
    when(lead2.getPhoneNumber()).thenReturn('0102030406');
    when(lead2.getStatus()).thenReturn(Status.PUBLIC);
    when(lead2.getType()).thenReturn(Type.ELEMENTARY);

    when(leadRepository.findLeads(1)).thenResolve([
      [instance(lead2), instance(lead1)],
      2
    ]);

    const queryHandler = new GetLeadsQueryHandler(instance(leadRepository));
    const expectedResult = new Pagination<LeadView>(
      [
        new LeadView(
          'd54f15d6-1a1d-47e8-8672-9f46018f9960',
          'abcDes',
          'Ecole Primaire les Landes',
          '12 Rue des Lampes',
          '75018',
          'Paris',
          'email2@email.com',
          '0102030406',
          Status.PUBLIC,
          Type.ELEMENTARY,
          null
        ),
        new LeadView(
          'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
          'xLKJSs',
          'Ecole élementaire Belliard',
          '127 Rue Belliard',
          '75010',
          'Paris',
          'email@email.com',
          '0102030405',
          Status.PRIVATE,
          Type.ELEMENTARY,
          200
        )
      ],
      2
    );

    expect(await queryHandler.execute(new GetLeadsQuery(1))).toMatchObject(expectedResult);
    verify(leadRepository.findLeads(1)).once();
  });
});
