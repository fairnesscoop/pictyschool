import {
  Controller,
  Inject,
  UseGuards,
  Post,
  Param,
  BadRequestException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { SchoolUploadEndpointView } from 'src/Application/School/View/SchoolUploadEndpointView';
import { IFileUpload } from 'src/Application/IFileUpload';
import { CreateIngestionCommand } from 'src/Application/Ingestion/Command/CreateIngestionCommand';
import { ICommandBus } from '@nestjs/cqrs';

@Controller('ingestions')
@ApiTags('Ingestion')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreateFileIngestionAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('IFileUpload')
    private readonly fileUploadAdapter: IFileUpload
  ) {}

  @Post(':id/photos')
  @Roles('photographer')
  @ApiOperation({
    summary:
      'Create ingestion for a school, and return enpoint to upload files containing photos'
  })
  public async index(@Param() idDto: IdDTO): Promise<SchoolUploadEndpointView> {
    try {
      const ingestionId = await this.commandBus.execute(
        new CreateIngestionCommand(idDto.id)
      );

      const url = await this.fileUploadAdapter.getEndPoint(
        `upload/photo/${ingestionId}.zip`
      );

      return new SchoolUploadEndpointView(url);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
