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
import { CreateLeadCommand } from 'src/Application/Lead/Command/CreateLeadCommand';
import { UserRole } from 'src/Domain/User/User.entity';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { LeadDTO } from '../DTO/LeadDTO';

@Controller('leads')
@ApiTags('Lead')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreateLeadAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Create new lead' })
  public async index(@Body() dto: LeadDTO) {
    const {
      reference,
      name,
      address,
      zipCode,
      city,
      email,
      phoneNumber,
      numberOfStudents
    } = dto;

    try {
      const id = await this.commandBus.execute(
        new CreateLeadCommand(
          reference,
          name,
          address,
          zipCode,
          city,
          email,
          phoneNumber,
          numberOfStudents
        )
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
