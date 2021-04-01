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
import { RemoveUserCommand } from 'src/Application/User/Command/RemoveUserCommand';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { LoggedUser } from '../Decorator/LoggedUser';
import { UserAuthView } from '../Security/UserAuthView';

@Controller('users')
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class RemoveUserAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Delete(':id')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Remove user' })
  public async index(
    @Param() { id }: IdDTO,
    @LoggedUser() user: UserAuthView
  ) {
    try {
      await this.commandBus.execute(new RemoveUserCommand(id, user.id));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
