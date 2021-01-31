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
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { SchoolDTO } from '../DTO/SchoolDTO';

@Controller('schools')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class UpdateSchoolAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id')
  @Roles('photographer')
  @ApiOperation({ summary: 'Update school' })
  public async index(@Param() idDto: IdDTO, @Body() dto: SchoolDTO) {
    try {
      const { name, address, city, zipCode, reference, schoolTypeId } = dto;
      const id = await this.commandBus.execute(
        new UpdateSchoolCommand(
          idDto.id,
          name,
          reference,
          address,
          city,
          zipCode,
          schoolTypeId
        )
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
