import { instance, mock } from 'ts-mockito';
import { School } from './School.entity';
import { Shooting, ShootingStatus } from './Shooting.entity';

describe('Shooting', () => {
  it('testGetters', () => {
    const school = mock(School);
    const shooting = new Shooting(
      'Prise de vue début année',
      new Date('2021-04-17'),
      new Date('2021-09-01'),
      ShootingStatus.DISABLED,
      instance(school)
    );
    expect(shooting.getId()).toBeUndefined();
    expect(shooting.getName()).toBe('Prise de vue début année');
    expect(shooting.getShootingDate()).toMatchObject(new Date('2021-04-17T00:00:00.000Z'));
    expect(shooting.getClosingDate()).toMatchObject(new Date('2021-09-01T00:00:00.000Z'));
    expect(shooting.getStatus()).toBe(ShootingStatus.DISABLED);
    expect(shooting.getSchool()).toBe(instance(school));
  });

  it('testUpdate', () => {
    const school = mock(School);
    const shooting = new Shooting(
      'Prise de vue début année',
      new Date('2021-04-17'),
      new Date('2021-09-01'),
      ShootingStatus.DISABLED,
      instance(school)
    );

    shooting.update(
      'Prise de vue fin année',
      new Date('2022-04-17'),
      new Date('2022-09-01')
    );


    expect(shooting.getId()).toBeUndefined();
    expect(shooting.getName()).toBe('Prise de vue fin année');
    expect(shooting.getShootingDate()).toMatchObject(new Date('2022-04-17T00:00:00.000Z'));
    expect(shooting.getClosingDate()).toMatchObject(new Date('2022-09-01T00:00:00.000Z'));
    expect(shooting.getStatus()).toBe(ShootingStatus.DISABLED);
    expect(shooting.getSchool()).toBe(instance(school));
  });
});
