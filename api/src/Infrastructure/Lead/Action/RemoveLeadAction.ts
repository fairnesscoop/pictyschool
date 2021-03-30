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
import { RemoveLeadCommand } from 'src/Application/Lead/Command/RemoveLeadCommand';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';

@Controller('leads')
@ApiTags('Lead')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class RemoveLeadAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Delete(':id')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Remove lead' })
  public async index(@Param() { id }: IdDTO) {
    try {
      await this.commandBus.execute(new RemoveLeadCommand(id));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
