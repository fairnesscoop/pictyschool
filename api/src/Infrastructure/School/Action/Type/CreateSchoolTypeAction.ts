import {
  Controller,
  Inject,
  Post,
  Body,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { CreateSchoolTypeCommand } from 'src/Application/School/Command/Type/CreateSchoolTypeCommand';
import { UserRole } from 'src/Domain/User/User.entity';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { SchoolTypeDTO } from '../../DTO/SchoolTypeDTO';

@Controller('school-types')
@ApiTags('School type')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreateSchoolTypeAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Add a school type' })
  public async index(@Body() dto: SchoolTypeDTO) {
    try {
      const id = await this.commandBus.execute(
        new CreateSchoolTypeCommand(dto.name)
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
