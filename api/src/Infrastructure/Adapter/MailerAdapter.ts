import { Injectable } from '@nestjs/common';
import { IMail } from 'src/Application/IMail';
import { IMailer } from 'src/Application/IMailer';
import { send, setApiKey } from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerAdapter implements IMailer {
  constructor(
    private readonly configService: ConfigService
  ) {}

  public async send(mail: IMail): Promise<void> {
    const baseUrl = this.configService.get<string>('BASE_URL');

    try {
      setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
      await send({
        to: mail.to,
        from: this.configService.get<string>('MAIL_SENDER'),
        templateId: mail.templateId,
        dynamicTemplateData: {
          ...mail.payload,
          baseUrl
        }
      });
    } catch (error) {
      console.warn(error);
    }
  }
}
