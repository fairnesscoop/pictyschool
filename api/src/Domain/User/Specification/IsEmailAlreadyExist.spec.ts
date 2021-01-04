import { PhotographerRepository } from 'src/Infrastructure/User/Repository/PhotographerRepository';
import { mock, instance, when, verify } from 'ts-mockito';
import { Photographer } from '../Photographer.entity';
import { IsEmailAlreadyExist } from './IsEmailAlreadyExist';

describe('IsEmailAlreadyExist', () => {
  const email = 'mathieu@fairness.coop';

  let photographerRepository: PhotographerRepository;
  let isEmailAlreadyExist: IsEmailAlreadyExist;

  beforeEach(() => {
    photographerRepository = mock(PhotographerRepository);
    isEmailAlreadyExist = new IsEmailAlreadyExist(instance(photographerRepository));
  });

  it('testPhotographerCanRegister', async () => {
    when(photographerRepository.findOneByEmail(email)).thenResolve(null);
    expect(await isEmailAlreadyExist.isSatisfiedBy(email)).toBe(false);
    verify(photographerRepository.findOneByEmail(email)).once();
  });

  it('testPhotographerCannotRegister', async () => {
    when(photographerRepository.findOneByEmail(email)).thenResolve(
      new Photographer(
        'Mathieu',
        'MARCHOIS',
        email,
        'token',
        'password'
      )
    );
    expect(await isEmailAlreadyExist.isSatisfiedBy(email)).toBe(true);
    verify(photographerRepository.findOneByEmail(email)).once();
  });
});
