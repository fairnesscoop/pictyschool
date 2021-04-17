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
import { UpdateEventCommand } from 'src/Application/Calendar/Command/UpdateEventCommand';
import { ICommandBus } from 'src/Application/ICommandBus';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { EventDTO } from '../DTO/EventDTO';

@Controller('events')
@ApiTags('Calendar')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class UpdateEventAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Update event' })
  public async index(@Param() { id }: IdDTO, @Body() dto: EventDTO) {
    try {
      const { date, schoolId, userId, summary } = dto;

      await this.commandBus.execute(
        new UpdateEventCommand(
          id,
          new Date(date),
          userId,
          schoolId,
          summary
        )
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
