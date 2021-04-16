import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IFileUpload } from 'src/Application/IFileUpload';
import { S3Factory } from '../Ingestion/S3Factory';

@Injectable()
export class FileUploadS3Adapter implements IFileUpload {
  constructor(
    private readonly configService: ConfigService,
    private readonly s3Factory: S3Factory
  ) {}

  public getEndPoint(filePath: string): Promise<string> {
    const bucket = this.configService.get<string>('STORAGE_BUCKET');

    const s3Api = this.s3Factory.create();

    const s3Params = {
      Bucket: bucket,
      Key: filePath,
      Expires: 600,
      ContentType: 'application/octet-stream'
    };

    return new Promise<string>((resolve, reject) => {
      s3Api.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}
