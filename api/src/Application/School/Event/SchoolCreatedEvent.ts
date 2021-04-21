import { IEvent } from 'src/Application/IEvent';

export class SchoolCreatedEvent implements IEvent {
  constructor(public readonly schoolId: string) {}
}
