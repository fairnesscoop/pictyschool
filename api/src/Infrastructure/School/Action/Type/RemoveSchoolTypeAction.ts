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
import { RemoveSchoolTypeCommand } from 'src/Application/School/Command/Type/RemoveSchoolTypeCommand';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';

@Controller('school-types')
@ApiTags('School type')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class RemoveSchoolTypeAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Delete(':id')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({summary: 'Remove school type'})
  public async index(@Param() { id }: IdDTO) {
    try {
      await this.commandBus.execute(new RemoveSchoolTypeCommand(id));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
