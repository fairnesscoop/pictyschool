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
    expect(photographer.getId()).toBeUndefined();
    expect(photographer.getFirstName()).toBe('Mathieu');
    expect(photographer.getLastName()).toBe('MARCHOIS');
    expect(photographer.getEmail()).toBe('mathieu@fairness.coop');
    expect(photographer.getApiToken()).toBe('apiToken');
    expect(photographer.getPassword()).toBe('password');
  });

  it('testUpdate', () => {
    const photographer = new Photographer(
      'Mathieu',
      'MARCHOIS',
      'mathieu@fairness.coop',
      'hashToken',
      'hashPassword'
    );
    photographer.update('firstName', 'lastName', 'email@email.com');
    photographer.updatePassword('password');

    expect(photographer.getId()).toBeUndefined();
    expect(photographer.getEmail()).toBe('email@email.com');
    expect(photographer.getFirstName()).toBe('firstName');
    expect(photographer.getLastName()).toBe('lastName');
    expect(photographer.getPassword()).toBe('password');
    expect(photographer.getApiToken()).toBe('hashToken');
  });
});
