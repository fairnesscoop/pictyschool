import {mock, instance, verify, when } from 'ts-mockito';
import { UnauthorizedException } from '@nestjs/common';
import { PhotographerStrategy } from './PhotographerStrategy';
import { PhotographerRepository } from '../Repository/PhotographerRepository';
import { Photographer } from 'src/Domain/User/Photographer.entity';

describe('PhotographerStrategy', () => {
  let photographerStrategy: PhotographerStrategy;
  let photographerRepository: PhotographerRepository;

  beforeEach(() => {
    photographerRepository = mock(PhotographerRepository);
    photographerStrategy = new PhotographerStrategy(instance(photographerRepository));
  });

  it('testPhotographerFound', async () => {
    const photographer = new Photographer(
      'Mathieu',
      'MARCHOIS',
      'mathieu@fairness.coop',
      'token',
      'password'
    );

    when(photographerRepository.findOneByApiToken('apiToken')).thenResolve(photographer);
    expect(await photographerStrategy.validate('apiToken')).toMatchObject(photographer);
    verify(photographerRepository.findOneByApiToken('apiToken')).once();
  });

  it('testPhotographerNotFound', async () => {
    when(photographerRepository.findOneByApiToken('apiToken')).thenResolve(undefined);

    try {
      await photographerStrategy.validate('apiToken');
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedException);
      verify(photographerRepository.findOneByApiToken('apiToken')).once();
    }
  });
});
