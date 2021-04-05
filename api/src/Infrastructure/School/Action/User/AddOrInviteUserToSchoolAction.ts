import {
  Controller,
  Inject,
  Body,
  BadRequestException,
  UseGuards,
  Param,
  Post
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { IQueryBus } from 'src/Application/IQueryBus';
import { AddUserToSchoolCommand } from 'src/Application/School/Command/User/AddUserToSchoolCommand';
import { CreateVoucherCommand } from 'src/Application/School/Command/Voucher/CreateVoucherCommand';
import { GetUserByEmailQuery } from 'src/Application/User/Query/GetUserByEmailQuery';
import { User, UserRole } from 'src/Domain/User/User.entity';
import { EmailDTO } from 'src/Infrastructure/Common/DTO/EmailDTO';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';

@Controller('schools')
@ApiTags('School user')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class AddOrInviteUserToSchoolAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
  ) {}

  @Post(':id/users')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Add or invite a user to a school' })
  public async index(@Param() { id }: IdDTO, @Body() { email }: EmailDTO) {
    try {
      const user: User = await this.queryBus.execute(new GetUserByEmailQuery(email));
      if (user instanceof User) {
        await this.commandBus.execute(new AddUserToSchoolCommand(user.getId(), id));
      } else {
        await this.commandBus.execute(new CreateVoucherCommand(id, email));
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
