export class EventNotFoundException extends Error {
  constructor() {
    super('calendar.errors.event_not_found');
  }
}
