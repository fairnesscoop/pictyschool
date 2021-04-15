import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { EventNotFoundException } from 'src/Domain/Calendar/Exception/EventNotFoundException';
import { IEventRepository } from 'src/Domain/Calendar/Repository/IEventRepository';
import { RemoveEventCommand } from './RemoveEventCommand';

@CommandHandler(RemoveEventCommand)
export class RemoveEventCommandHandler {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
  ) {}

  public async execute({ id }: RemoveEventCommand): Promise<void> {
    const event = await this.eventRepository.findOneById(id);

    if (!event) {
      throw new EventNotFoundException();
    }

    await this.eventRepository.remove(event);
  }
}
