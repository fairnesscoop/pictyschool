import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateEventCommand } from './CreateEventCommand';
import { IEventRepository } from 'src/Domain/Calendar/Repository/IEventRepository';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { Event } from 'src/Domain/Calendar/Event.entity';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { UserNotFoundException } from 'src/Domain/User/Exception/UserNotFoundException';

@CommandHandler(CreateEventCommand)
export class CreateEventCommandHandler {
  constructor(
    @Inject('ISchoolRepository')
    private readonly schoolRepository: ISchoolRepository,
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  public async execute(command: CreateEventCommand): Promise<string> {
    const { date, summary, userId, schoolId } = command;

    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    const school = await this.schoolRepository.findOneById(schoolId);
    if (!school) {
      throw new SchoolNotFoundException();
    }

    const event = await this.eventRepository.save(
      new Event(
        date,
        user,
        school,
        summary
      )
    );

    return event.getId();
  }
}
