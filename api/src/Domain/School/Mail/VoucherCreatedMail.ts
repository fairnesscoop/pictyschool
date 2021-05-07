import { IMail } from 'src/Application/IMail';

export class VoucherCreatedMail implements IMail {
  constructor(
    public readonly to: string[],
    public readonly templateId: string,
    public readonly payload: Record<string, unknown>,
  ) {}
}
