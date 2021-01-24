import { SchoolType } from './SchoolType.entity';

describe('SchoolType', () => {
  it('testGetters', () => {
    const schooltype = new SchoolType('Maternelle');
    expect(schooltype.getId()).toBeUndefined();
    expect(schooltype.getName()).toBe('Maternelle');
  });

  it('testUpdate', () => {
    const schooltype = new SchoolType('Maternelle');
    expect(schooltype.getId()).toBeUndefined();
    expect(schooltype.getName()).toBe('Maternelle');
    schooltype.update('Elementaire');
    expect(schooltype.getName()).toBe('Elementaire');
  });
});
