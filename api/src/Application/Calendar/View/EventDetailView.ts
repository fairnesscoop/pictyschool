import { SchoolSummaryView } from 'src/Application/School/View/SchoolSummaryView';
import { UserSummaryView } from 'src/Application/User/View/UserSummaryView';

export class EventDetailView {
  constructor(
    public readonly id: string,
    public readonly school: SchoolSummaryView,
    public readonly user: UserSummaryView,
    public readonly start: Date,
    public readonly summary: string | undefined
  ) {}
}
