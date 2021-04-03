import { mock, instance, when, verify, anything } from 'ts-mockito';
import { SchoolUserRepository } from 'src/Infrastructure/School/Repository/SchoolUserRepository';
import { SchoolUser } from 'src/Domain/School/SchoolUser.entity';
import { RemoveSchoolUserCommandHandler } from './RemoveSchoolUserCommandHandler';
import { RemoveSchoolUserCommand } from './RemoveSchoolUserCommand';
import { SchoolUserNotFoundException } from 'src/Domain/School/Exception/SchoolUserNotFoundException';

describe('RemoveSchoolUserCommandHandler', () => {
  let schooluserRepository: SchoolUserRepository;
  let removedSchoolUser: SchoolUser;
  let handler: RemoveSchoolUserCommandHandler;

  const command = new RemoveSchoolUserCommand('17efcbee-bd2f-410e-9e99-51684b592bad');

  beforeEach(() => {
    schooluserRepository = mock(SchoolUserRepository);
    removedSchoolUser = mock(SchoolUser);

    handler = new RemoveSchoolUserCommandHandler(
      instance(schooluserRepository)
    );
  });

  it('testSchoolUserRemovedSuccessfully', async () => {
    when(schooluserRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(instance(removedSchoolUser));
    when(removedSchoolUser.getId()).thenReturn(
      '17efcbee-bd2f-410e-9e99-51684b592bad'
    );
    when(
      schooluserRepository.save(instance(removedSchoolUser))
    ).thenResolve(instance(removedSchoolUser));

    await handler.execute(command);

    verify(
      schooluserRepository.remove(instance(removedSchoolUser))
    ).once();
    verify(schooluserRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
  });

  it('testSchoolUserNotFound', async () => {
    when(schooluserRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad'))
      .thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolUserNotFoundException);
      expect(e.message).toBe('schools.users.errors.school_user_not_found');
      verify(schooluserRepository.findOneById('17efcbee-bd2f-410e-9e99-51684b592bad')).once();
      verify(schooluserRepository.remove(anything())).never();
    }
  });
});
