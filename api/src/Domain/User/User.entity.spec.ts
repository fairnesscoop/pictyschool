import { User } from './User.entity';

describe('User', () => {
  it('testGetters', () => {
    const user = new User(
      'Mathieu',
      'MARCHOIS',
      'mathieu@fairness.coop',
      'apiToken',
      'password'
    );
    expect(user.getId()).toBeUndefined();
    expect(user.getFirstName()).toBe('Mathieu');
    expect(user.getLastName()).toBe('MARCHOIS');
    expect(user.getEmail()).toBe('mathieu@fairness.coop');
    expect(user.getApiToken()).toBe('apiToken');
    expect(user.getPassword()).toBe('password');
  });

  it('testUpdate', () => {
    const user = new User(
      'Mathieu',
      'MARCHOIS',
      'mathieu@fairness.coop',
      'hashToken',
      'hashPassword'
    );
    user.update('firstName', 'lastName', 'email@email.com');
    user.updatePassword('password');

    expect(user.getId()).toBeUndefined();
    expect(user.getEmail()).toBe('email@email.com');
    expect(user.getFirstName()).toBe('firstName');
    expect(user.getLastName()).toBe('lastName');
    expect(user.getPassword()).toBe('password');
    expect(user.getApiToken()).toBe('hashToken');
  });
});
