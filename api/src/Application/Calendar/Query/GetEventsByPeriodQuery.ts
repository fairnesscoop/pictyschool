import { IQuery } from 'src/Application/IQuery';

export class GetEventsByPeriodQuery implements IQuery {
  constructor(
    public readonly fromDate: Date,
    public readonly toDate: Date
  ) {}
}
