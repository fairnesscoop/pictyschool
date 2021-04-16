import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileUploadS3Adapter } from '../Adapter/FileUploadS3Adapter';
import { S3 } from 'aws-sdk';
import { S3Factory } from './S3Factory';

const providers = [
  { provide: 'IFileUpload', useClass: FileUploadS3Adapter },
  S3Factory
];

@Module({
  imports: [
    ConfigModule
  ],
  providers: [...providers, S3],
  exports: providers
})
export class IngestionModule {}
