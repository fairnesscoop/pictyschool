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
import { UpdateSchoolCommand } from 'src/Application/School/Command/UpdateSchoolCommand';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { SchoolDTO } from '../DTO/SchoolDTO';

@Controller('schools')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class UpdateSchoolAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Update school' })
  public async index(@Param() idDto: IdDTO, @Body() dto: SchoolDTO) {
    try {
      const {
        reference,
        name,
        address,
        zipCode,
        city,
        schoolTypeId,
        phoneNumber,
        numberOfClasses,
        numberOfStudents,
        observation,
        pdv
      } = dto;

      const id = await this.commandBus.execute(
        new UpdateSchoolCommand(
          idDto.id,
          reference,
          name,
          address,
          city,
          zipCode,
          schoolTypeId,
          phoneNumber,
          numberOfStudents,
          numberOfClasses,
          observation,
          pdv
        )
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
