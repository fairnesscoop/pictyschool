import { mock, instance, verify, when } from 'ts-mockito';
import { UnauthorizedException } from '@nestjs/common';
import { BearerStrategy } from './BearerStrategy';
import { PhotographerRepository } from '../Repository/PhotographerRepository';
import { Photographer } from 'src/Domain/User/Photographer.entity';
import { UserAuthView } from './UserAuthView';

describe('BearerStrategy', () => {
  let bearerStrategy: BearerStrategy;
  let photographerRepository: PhotographerRepository;

  beforeEach(() => {
    photographerRepository = mock(PhotographerRepository);
    bearerStrategy = new BearerStrategy(instance(photographerRepository));
  });

  it('testPhotographerFound', async () => {
    const photographer = mock(Photographer);
    when(photographer.getId()).thenReturn('e29f69b7-1eb9-46dc-af0f-b33ff72e9cea');
    when(photographerRepository.findOneByApiToken('apiToken')).thenResolve(instance(photographer));
    expect(await bearerStrategy.validate('apiToken')).toMatchObject(
      new UserAuthView('e29f69b7-1eb9-46dc-af0f-b33ff72e9cea', 'photographer')
    );
    verify(photographerRepository.findOneByApiToken('apiToken')).once();
  });

  it('testPhotographerNotFound', async () => {
    when(photographerRepository.findOneByApiToken('apiToken')).thenResolve(null);

    try {
      expect(await bearerStrategy.validate('apiToken')).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedException);
      verify(photographerRepository.findOneByApiToken('apiToken')).once();
    }
  });
});
