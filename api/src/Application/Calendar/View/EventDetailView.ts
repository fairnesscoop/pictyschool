import { SchoolSummaryView } from 'src/Application/School/View/SchoolSummaryView';

export class EventDetailView {
  constructor(
    public readonly id: string,
    public readonly school: SchoolSummaryView,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly start: Date,
    public readonly summary: string | undefined
  ) {}
}
