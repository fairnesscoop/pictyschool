import { Lead } from './Lead.entity';

describe('Lead', () => {
  it('testGetters', () => {
    const lead = new Lead(
      'LM120I',
      'Belliard',
      '127 Rue Belliard',
      '75018',
      'Paris',
      'test@test.com',
      '010101010101',
      200
    );
    expect(lead.getId()).toBeUndefined();
    expect(lead.getName()).toBe('Belliard');
    expect(lead.getReference()).toBe('LM120I');
    expect(lead.getCity()).toBe('Paris');
    expect(lead.getZipCode()).toBe('75018');
    expect(lead.getAddress()).toBe('127 Rue Belliard');
    expect(lead.getPhoneNumber()).toBe('010101010101');
    expect(lead.getEmail()).toBe('test@test.com');
    expect(lead.getNumberOfStudents()).toBe(200);
    expect(lead.getCreatedAt()).toBeUndefined();
  });
});
