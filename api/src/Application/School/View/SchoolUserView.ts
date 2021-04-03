export class SchoolUserView {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly type: 'voucher' | 'schoolUser'
  ) {}
}
