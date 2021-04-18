import {
  Controller,
  Inject,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Param
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { CreateShootingCommand } from 'src/Application/School/Command/Shooting/CreateShootingCommand';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { ShootingDTO } from '../../DTO/ShootingDTO';

@Controller('schools')
@ApiTags('School shooting')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreateShootingAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post(':id/shootings')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Create a shooting' })
  public async index(@Param() idDto: IdDTO, @Body() dto: ShootingDTO) {
    const { name, shootingDate, closingDate } = dto;

    try {
      const id = await this.commandBus.execute(
        new CreateShootingCommand(
          name,
          new Date(shootingDate),
          new Date(closingDate),
          idDto.id
        )
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
