import { S3 } from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Factory {
  constructor(
    private readonly configService: ConfigService
  ) {}

  create(): S3 {
    const accessKeyId = this.configService.get<string>('S3_API_KEY');
    const secretAccessKey = this.configService.get<string>('S3_API_SECRET');

    return new S3({
        accessKeyId,
        secretAccessKey,
        region: 'fr-par',
        signatureVersion: 's3v4',
        endpoint: 'https://s3.fr-par.scw.cloud'
      });
  }
}
