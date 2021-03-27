import {
  Controller,
  Inject,
  Body,
  BadRequestException,
  UseGuards,
  Param,
  Put
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { AssignDirectorToSchoolCommand } from 'src/Application/School/Command/AssignDirectorToSchoolCommand';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { UserIdDTO } from 'src/Infrastructure/User/DTO/UserIdDTO';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';

@Controller('schools')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class AssignDirectorToSchoolAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id/director')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Assign a director to a school' })
  public async index(@Param() { id }: IdDTO, @Body() { userId }: UserIdDTO) {
    try {
      await this.commandBus.execute(
        new AssignDirectorToSchoolCommand(userId, id)
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
