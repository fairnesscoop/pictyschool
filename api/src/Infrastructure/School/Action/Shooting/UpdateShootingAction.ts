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
import { UpdateShootingCommand } from 'src/Application/School/Command/Shooting/UpdateShootingCommand';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { ShootingDTO } from '../../DTO/ShootingDTO';

@Controller('schools/:schoolId/shootings')
@ApiTags('School shooting')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class UpdateShootingAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) { }

  @Put(':id')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Update shooting' })
  public async index(@Param() idDto: IdDTO, @Body() dto: ShootingDTO) {
    try {
      const { name, groupClosingDate, shootingDate, individualClosingDate, notice } = dto;
      const id = await this.commandBus.execute(
        new UpdateShootingCommand(
          idDto.id,
          name,
          new Date(shootingDate),
          new Date(groupClosingDate),
          new Date(individualClosingDate),
          notice
        )
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
