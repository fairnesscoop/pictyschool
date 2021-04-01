import { mock, instance, when, verify } from 'ts-mockito';
import { SchoolUser } from 'src/Domain/School/SchoolUser.entity';
import { User } from 'src/Domain/User/User.entity';
import { GetSchoolUsersQuery } from './GetSchoolUsersQuery';
import { GetSchoolUsersQueryHandler } from './GetSchoolUsersQueryHandler';
import { SchoolUserRepository } from 'src/Infrastructure/School/Repository/SchoolUserRepository';
import { UserSummaryView } from 'src/Application/User/View/UserSummaryView';

describe('GetSchoolsQueryHandler', () => {
  it('testGetSchoolUsers', async () => {
    const schoolUserRepository = mock(SchoolUserRepository);

    const user1 = mock(User);
    when(user1.getId()).thenReturn('4de2ffc4-e835-44c8-95b7-17c171c09873');
    when(user1.getFirstName()).thenReturn('Mathieu');
    when(user1.getLastName()).thenReturn('MARCHOIS');
    when(user1.getEmail()).thenReturn('mathieu@fairness.coop');

    const schoolUser1 = mock(SchoolUser);
    when(schoolUser1.getUser()).thenReturn(instance(user1));

    when(
      schoolUserRepository.findUsersBySchool(
        '5eb3173b-97ab-4bbc-b31c-878d4bfafbc1'
      )
    ).thenResolve([instance(schoolUser1)]);

    const queryHandler = new GetSchoolUsersQueryHandler(
      instance(schoolUserRepository)
    );

    const expectedResult = [
      new UserSummaryView(
        '4de2ffc4-e835-44c8-95b7-17c171c09873',
        'Mathieu',
        'MARCHOIS',
        'mathieu@fairness.coop',
      )
    ];

    expect(
      await queryHandler.execute(
        new GetSchoolUsersQuery('5eb3173b-97ab-4bbc-b31c-878d4bfafbc1')
      )
    ).toMatchObject(expectedResult);
    verify(
      schoolUserRepository.findUsersBySchool('5eb3173b-97ab-4bbc-b31c-878d4bfafbc1')
    ).once();
  });
});
