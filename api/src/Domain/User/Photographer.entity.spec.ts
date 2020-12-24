import { Photographer } from './Photographer.entity';

describe('Photographer', () => {
  it('testGetters', () => {
    const photographer = new Photographer(
      'Mathieu',
      'MARCHOIS',
      'mathieu@fairness.coop',
      'apiToken',
      'password'
    );
    expect(photographer.getId()).toBe(undefined);
    expect(photographer.getFirstName()).toBe('Mathieu');
    expect(photographer.getLastName()).toBe('MARCHOIS');
    expect(photographer.getEmail()).toBe('mathieu@fairness.coop');
    expect(photographer.getApiToken()).toBe('apiToken');
    expect(photographer.getPassword()).toBe('password');
  });
});
