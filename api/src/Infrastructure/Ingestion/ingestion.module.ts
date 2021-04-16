import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileUploadS3Adapter } from '../Adapter/FileUploadS3Adapter';

const providers = [
  { provide: 'IFileUpload', useClass: FileUploadS3Adapter }
];

@Module({
  imports: [
    ConfigModule
  ],
  providers,
  exports: providers
})
export class IngestionModule {}
