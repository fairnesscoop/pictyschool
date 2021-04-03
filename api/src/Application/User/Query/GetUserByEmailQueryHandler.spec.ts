import { mock, instance, when, verify } from 'ts-mockito';
import { GetUserByEmailQueryHandler } from './GetUserByEmailQueryHandler';
import { GetUserByEmailQuery } from './GetUserByEmailQuery';
import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import { User } from 'src/Domain/User/User.entity';

describe('GetUserByEmailQueryHandler', () => {
  const query = new GetUserByEmailQuery('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');

  it('testGetUser', async () => {
    const userRepository = mock(UserRepository);
    const queryHandler = new GetUserByEmailQueryHandler(instance(userRepository));
    const user = mock(User);
    when(
      userRepository.findOneByEmail('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(user));

    expect(await queryHandler.execute(query)).toMatchObject(
      instance(user)
    );

    verify(
      userRepository.findOneByEmail('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
  });
});
