export class VoucherView {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly email: string,
    public readonly schoolId: string,
  ) {}
}
