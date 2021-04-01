import { mock, instance, when, verify, anything } from 'ts-mockito';
import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import { User } from 'src/Domain/User/User.entity';
import { RemoveUserCommandHandler } from './RemoveUserCommandHandler';
import { RemoveUserCommand } from './RemoveUserCommand';
import { UserNotFoundException } from 'src/Domain/User/Exception/UserNotFoundException';
import { CantRemoveYourselfException } from 'src/Domain/User/Exception/CantRemoveYourselfException';

describe('RemoveUserCommandHandler', () => {
  let userRepository: UserRepository;
  let removedUser: User;
  let handler: RemoveUserCommandHandler;

  const command = new RemoveUserCommand(
    '17efcbee-bd2f-410e-9e99-51684b592bad',
    'c47f70f1-101c-4d9b-84e1-f88bed74f957'
  );

  beforeEach(() => {
    userRepository = mock(UserRepository);
    removedUser = mock(User);

    handler = new RemoveUserCommandHandler(
      instance(userRepository)
    );
  });

  it('testUserRemovedSuccessfully', async () => {
    when(userRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(instance(removedUser));
    when(removedUser.getId()).thenReturn(
      '17efcbee-bd2f-410e-9e99-51684b592bad'
    );
    when(
      userRepository.save(instance(removedUser))
    ).thenResolve(instance(removedUser));

    await handler.execute(command);

    verify(
      userRepository.remove(instance(removedUser))
    ).once();
    verify(userRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
  });

  it('testUserNotFound', async () => {
    when(userRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(UserNotFoundException);
      expect(e.message).toBe('users.errors.not_found');
      verify(userRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
      verify(userRepository.remove(anything())).never();
    }
  });

  it('testCantRemoveYourself', async () => {
    const command2 = new RemoveUserCommand(
      '17efcbee-bd2f-410e-9e99-51684b592bad',
      '17efcbee-bd2f-410e-9e99-51684b592bad'
    );
    
    try {
      expect(await handler.execute(command2)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(CantRemoveYourselfException);
      expect(e.message).toBe('users.errors.cant_remove_yourself');
      verify(userRepository.findOneById(anything())).never();
      verify(userRepository.remove(anything())).never();
    }
  });
});
