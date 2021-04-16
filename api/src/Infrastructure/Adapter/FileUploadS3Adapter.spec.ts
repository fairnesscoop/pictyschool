import { mock, instance, when, objectContaining, anyFunction } from 'ts-mockito';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { FileUploadS3Adapter } from './FileUploadS3Adapter';
import { S3Factory } from '../Ingestion/S3Factory';

describe('FileUploadS3Adapter', () => {
  it('testGetEnpoint', async () => {
    const configService: ConfigService = mock(ConfigService);
    when(configService.get<string>('STORAGE_BUCKET')).thenReturn('my-test-bucket');

    const s3: S3 = mock(S3);
    when(s3.getSignedUrl(
      'putObject',
      objectContaining({Bucket: 'my-test-bucket', Key: 'path/to/file'}),
      anyFunction()
    )).thenCall((operation: string, params: any, callback) => callback(null, 'https://bucket.endpoint.url/path/to/file'));

    const s3Factory: S3Factory = mock(S3Factory);
    when(s3Factory.create()).thenReturn(instance(s3));

    const fileUploadAdapter = new FileUploadS3Adapter(instance(configService), instance(s3Factory));
    expect(
      await fileUploadAdapter.getEndPoint('path/to/file')
    ).toBe('https://bucket.endpoint.url/path/to/file');
  });

  it('testGetEnpointFailed', async () => {
    const configService: ConfigService = mock(ConfigService);
    when(configService.get<string>('STORAGE_BUCKET')).thenReturn('my-test-bucket');

    const s3: S3 = mock(S3);
    when(s3.getSignedUrl(
      'putObject',
      objectContaining({Bucket: 'my-test-bucket', Key: 'path/to/file'}),
      anyFunction()
    )).thenCall((operation: string, params: any, callback) => callback('bad params', null));

    const s3Factory: S3Factory = mock(S3Factory);
    when(s3Factory.create()).thenReturn(instance(s3));

    const fileUploadAdapter = new FileUploadS3Adapter(instance(configService), instance(s3Factory));
    try {
      await fileUploadAdapter.getEndPoint('path/to/file')
    } catch (error) {
      expect(error).toBe('bad params');
    }
  });
});
