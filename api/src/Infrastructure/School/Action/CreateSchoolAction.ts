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
import { Photographer } from 'src/Domain/User/Photographer.entity';
import { LoggedPhotographer } from 'src/Infrastructure/User/Decorator/LoggedPhotographer';
import { SchoolDTO } from '../DTO/SchoolDTO';

@Controller('schools')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class CreateSchoolAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @ApiOperation({summary: 'Create new school'})
  public async index(@Body() dto: SchoolDTO, @LoggedPhotographer() photographer: Photographer) {
    const { reference, name, address, zipCode, city } = dto;

    try {
      const id = await this.commandBus.execute(
        new CreateSchoolCommand(
          reference,
          name,
          address,
          zipCode,
          city,
          photographer
        )
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
