import {
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Param,
  Delete
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { RemoveSchoolUserCommand } from 'src/Application/School/Command/User/RemoveSchoolUserCommand';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';

@Controller('schools')
@ApiTags('School user')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class RemoveSchoolUserAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Delete('/:schoolId/users/:id')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Remove school user' })
  public async index(@Param() { id }: IdDTO) {
    try {
      await this.commandBus.execute(new RemoveSchoolUserCommand(id));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
