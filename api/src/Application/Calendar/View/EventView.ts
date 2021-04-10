export class EventView {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly start: Date,
    public readonly summary: string
  ) {}
}
