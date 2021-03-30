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
import { UpdateLeadCommand } from 'src/Application/Lead/Command/UpdateLeadCommand';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { LeadDTO } from '../DTO/LeadDTO';

@Controller('leads')
@ApiTags('Lead')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class UpdateLeadAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Update lead' })
  public async index(@Param() { id }: IdDTO, @Body() dto: LeadDTO) {
    try {
      const {
        reference,
        name,
        address,
        zipCode,
        city,
        email,
        phoneNumber,
        numberOfStudents,
        status,
        type
      } = dto;

      await this.commandBus.execute(
        new UpdateLeadCommand(
          id,
          reference,
          name,
          address,
          zipCode,
          city,
          email,
          phoneNumber,
          status,
          type,
          numberOfStudents
        )
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
