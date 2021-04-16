import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { IFileUpload } from 'src/Application/IFileUpload';

export class FileUploadS3Adapter implements IFileUpload {
  constructor(private readonly configService: ConfigService) {}

  public getEndPoint(filePath: string): Promise<string> {
    const accessKeyId = this.configService.get<string>('S3_API_KEY');
    const secretAccessKey = this.configService.get<string>('S3_API_SECRET');
    const bucket = this.configService.get<string>('STORAGE_BUCKET');

    const s3 = new S3({
      accessKeyId,
      secretAccessKey,
      endpoint: 'https://s3.fr-par.scw.cloud',
      region: 'fr-par',
      signatureVersion: 's3v4'
    });

    const s3Params = {
      Bucket: bucket,
      Key: filePath,
      Expires: 600,
      ContentType: 'application/octet-stream'
    };

    return new Promise<string>((resolve, reject) => {
      s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}
