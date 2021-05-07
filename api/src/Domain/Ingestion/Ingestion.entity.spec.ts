import { mock, instance } from 'ts-mockito';
import { School } from '../School/School.entity';
import { Ingestion, State } from './Ingestion.entity';

describe('Ingestion', () => {
  it('testGetters', () => {
    const school = mock(School);
    const ingestion = new Ingestion(
      instance(school)
    );
    expect(ingestion.getId()).toBeUndefined();
    expect(ingestion.getState()).toBe(State.INIT);
    expect(ingestion.getSchool()).toBe(instance(school));
  });
});
