import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileUploadS3Adapter } from '../Adapter/FileUploadS3Adapter';
import { S3 } from 'aws-sdk';
import { S3Factory } from './S3Factory';
import { CreateIngestionCommandHandler } from 'src/Application/Ingestion/Command/CreateShootingCommandHandler';
import { IngestionRepository } from 'src/Infrastructure/Ingestion/Repository/IngestionRepository';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { CreateFileIngestionAction } from './Action/CreateFileIngestionAction';
import { BusModule } from '../bus.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingestion } from 'src/Domain/Ingestion/Ingestion.entity';
import { School } from 'src/Domain/School/School.entity';

@Module({
  imports: [
    ConfigModule,
    BusModule,
    TypeOrmModule.forFeature([School]),
    TypeOrmModule.forFeature([Ingestion]),
  ],
  controllers: [CreateFileIngestionAction],
  providers: [
    { provide: 'IFileUpload', useClass: FileUploadS3Adapter },
    { provide: 'IIngestionRepository', useClass: IngestionRepository },
    { provide: 'ISchoolRepository', useClass: SchoolRepository },
    CreateIngestionCommandHandler,
    S3Factory,
    S3,
  ]
  // exports: providers
})
export class IngestionModule {}
