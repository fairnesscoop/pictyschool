import {
  Body,
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Put,
  Param
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { UpdateSchoolCommand } from 'src/Application/School/Command/UpdateSchoolCommand';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { SchoolDTO } from '../DTO/SchoolDTO';

@Controller('schools')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class UpdateSchoolAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id')
  @ApiOperation({ summary: 'Update school' })
  public async index(@Param() idDto: IdDTO, @Body() dto: SchoolDTO) {
    try {
      const { name, address, city, zipCode, reference } = dto;
      const id = await this.commandBus.execute(
        new UpdateSchoolCommand(
          idDto.id,
          name,
          reference,
          address,
          city,
          zipCode,
        )
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}