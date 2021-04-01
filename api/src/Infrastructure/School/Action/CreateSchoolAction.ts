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
import { CreateSchoolCommand } from 'src/Application/School/Command/CreateSchoolCommand';
import { UserRole } from 'src/Domain/User/User.entity';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { SchoolDTO } from '../DTO/SchoolDTO';

@Controller('schools')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreateSchoolAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Create new school' })
  public async index(@Body() dto: SchoolDTO) {
    const {
      reference,
      name,
      address,
      zipCode,
      city,
      email,
      phoneNumber,
      numberOfClasses,
      numberOfStudents,
      observation,
      pdv,
      status,
      type
    } = dto;

    try {
      const id = await this.commandBus.execute(
        new CreateSchoolCommand(
          reference,
          name,
          address,
          zipCode,
          city,
          status,
          type,
          email,
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
