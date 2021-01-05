import { mock, instance, when, verify, anything } from 'ts-mockito';
import { UpdateSchoolCommandHandler } from './UpdateSchoolCommandHandler';
import { UpdateSchoolCommand } from './UpdateSchoolCommand';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { IsSchoolAlreadyExist } from 'src/Domain/School/Specification/IsSchoolAlreadyExist';
import { School } from 'src/Domain/School/School.entity';
import { SchoolAlreadyExistException } from 'src/Domain/School/Exception/SchoolAlreadyExistException';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';

describe('UpdateSchoolCommandHandler', () => {
  let schoolRepository: SchoolRepository;
  let isSchoolAlreadyExist: IsSchoolAlreadyExist;

  let handler: UpdateSchoolCommandHandler;

  const school = mock(School);
  const command = new UpdateSchoolCommand(
    '8a9df044-94a7-4e6c-abd1-ecdd69d788d5',
    'Ecole élementaire Belliard',
    'xLKJSs',
    '127 Rue Belliard',
    'Paris',
    '75010'
  );

  beforeEach(() => {
    schoolRepository = mock(SchoolRepository);
    isSchoolAlreadyExist = mock(IsSchoolAlreadyExist);
    handler = new UpdateSchoolCommandHandler(
      instance(schoolRepository),
      instance(isSchoolAlreadyExist)
    );
  });

  it('testSchoolNotFound', async () => {
    when(
      schoolRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolNotFoundException);
      expect(e.message).toBe('schools.errors.not_found');
      verify(
        schoolRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
      ).once();
      verify(isSchoolAlreadyExist.isSatisfiedBy(anything())).never();
      verify(schoolRepository.save(anything())).never();
      verify(
        school.update(anything(), anything(), anything(), anything(), anything())
      ).never();
    }
  });

  it('testSchoolAlreadyExist', async () => {
    when(school.getReference()).thenReturn('xLKJSs');
    when(
      schoolRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(instance(school));
    when(
      isSchoolAlreadyExist.isSatisfiedBy('xLKJSs')
    ).thenResolve(true);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolAlreadyExistException);
      expect(e.message).toBe('schools.errors.already_exist');
      verify(
        isSchoolAlreadyExist.isSatisfiedBy('xLKJSs')
      ).once();
      verify(
        school.update(anything(), anything(), anything(), anything(), anything())
      ).never();
      verify(schoolRepository.save(anything())).never();
    }
  });

  it('testSuccessfullyUpdated', async () => {
    when(school.getId()).thenReturn('8a9df044-94a7-4e6c-abd1-ecdd69d788d5');
    when(school.getReference()).thenReturn('xLKJSs');
    when(
      schoolRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(instance(school));

    expect(await handler.execute(command)).toBe(
      '8a9df044-94a7-4e6c-abd1-ecdd69d788d5'
    );

    verify(isSchoolAlreadyExist.isSatisfiedBy(anything())).never();
    verify(
      school.update(
        'xLKJSs',
        'Ecole élementaire Belliard',
        '127 Rue Belliard',
        '75010',
        'Paris'
      )
    ).calledBefore(schoolRepository.save(instance(school)));
    verify(schoolRepository.save(instance(school))).once();
  });
});
