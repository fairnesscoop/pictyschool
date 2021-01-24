import { mock, instance, when, verify } from 'ts-mockito';
import { GetPhotographerByIdQueryHandler } from './GetPhotographerByIdQueryHandler';
import { GetPhotographerByIdQuery } from './GetPhotographerByIdQuery';
import { PhotographerRepository } from 'src/Infrastructure/User/Repository/PhotographerRepository';
import { Photographer } from 'src/Domain/User/Photographer.entity';
import { PhotographerView } from '../View/PhotographerView';
import { PhotographerNotFoundException } from 'src/Domain/User/Exception/PhotographerNotFoundException';

describe('GetPhotographerByIdQueryHandler', () => {
  const query = new GetPhotographerByIdQuery('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');

  it('testGetPhotographer', async () => {
    const photographerRepository = mock(PhotographerRepository);
    const queryHandler = new GetPhotographerByIdQueryHandler(instance(photographerRepository));

    const photographer = mock(Photographer);

    when(photographer.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(photographer.getFirstName()).thenReturn('Mathieu');
    when(photographer.getLastName()).thenReturn('MARCHOIS');
    when(photographer.getEmail()).thenReturn('mathieu@fairness.coop');
    when(
      photographerRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(photographer));

    expect(await queryHandler.execute(query)).toMatchObject(
      new PhotographerView(
        'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
        'Mathieu',
        'MARCHOIS',
        'mathieu@fairness.coop'
      )
    );

    verify(
      photographerRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
    verify(photographer.getId()).once();
    verify(photographer.getFirstName()).once();
    verify(photographer.getLastName()).once();
    verify(photographer.getEmail()).once();
  });

  it('testGetPhotographerNotFound', async () => {
    const photographerRepository = mock(PhotographerRepository);
    const queryHandler = new GetPhotographerByIdQueryHandler(instance(photographerRepository));
    when(
      photographerRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(null);

    try {
      expect(await queryHandler.execute(query)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(PhotographerNotFoundException);
      expect(e.message).toBe('users.errors.not_found');
      verify(
        photographerRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
    }
  });
});
