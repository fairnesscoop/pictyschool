import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateEventCommand } from './UpdateEventCommand';
import { IEventRepository } from 'src/Domain/Calendar/Repository/IEventRepository';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { AbstractEventCommandHandler } from './AbstractEventCommandHandler';
import { EventNotFoundException } from 'src/Domain/Calendar/Exception/EventNotFoundException';

@CommandHandler(UpdateEventCommand)
export class UpdateEventCommandHandler extends AbstractEventCommandHandler {
  constructor(
    @Inject('ISchoolRepository') schoolRepository: ISchoolRepository,
    @Inject('IUserRepository') userRepository: IUserRepository,
    @Inject('IEventRepository') 
    private readonly eventRepository: IEventRepository,
  ) {
    super(schoolRepository, userRepository);
  }

  public async execute(command: UpdateEventCommand): Promise<string> {
    const { id, date, summary, userId, schoolId } = command;

    const event = await this.eventRepository.findOneById(id);
    if (!event) {
      throw new EventNotFoundException();
    }

    const [ user, school ] = await Promise.all([
      this.getUser(userId),
      this.getSchool(schoolId)
    ]);

    event.update(
      date,
      user,
      school,
      summary
    );

    await this.eventRepository.save(event);

    return event.getId();
  }
}
