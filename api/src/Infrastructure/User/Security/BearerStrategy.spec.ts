import { mock, instance, verify, when } from 'ts-mockito';
import { UnauthorizedException } from '@nestjs/common';
import { BearerStrategy } from './BearerStrategy';
import { UserRepository } from '../Repository/UserRepository';
import { User, UserRole } from 'src/Domain/User/User.entity';
import { UserAuthView } from './UserAuthView';

describe('BearerStrategy', () => {
  let bearerStrategy: BearerStrategy;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = mock(UserRepository);
    bearerStrategy = new BearerStrategy(instance(userRepository));
  });

  it('testUserFound', async () => {
    const user = mock(User);
    when(user.getId()).thenReturn('e29f69b7-1eb9-46dc-af0f-b33ff72e9cea');
    when(user.getRole()).thenReturn(UserRole.PHOTOGRAPHER);
    when(userRepository.findOneByApiToken('apiToken')).thenResolve(instance(user));
    expect(await bearerStrategy.validate('apiToken')).toMatchObject(
      new UserAuthView('e29f69b7-1eb9-46dc-af0f-b33ff72e9cea', UserRole.PHOTOGRAPHER)
    );
    verify(userRepository.findOneByApiToken('apiToken')).once();
  });

  it('testUserNotFound', async () => {
    when(userRepository.findOneByApiToken('apiToken')).thenResolve(null);

    try {
      expect(await bearerStrategy.validate('apiToken')).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedException);
      verify(userRepository.findOneByApiToken('apiToken')).once();
    }
  });
});
