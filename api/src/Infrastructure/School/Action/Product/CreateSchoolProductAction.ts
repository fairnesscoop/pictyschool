import {
  Controller,
  Inject,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Param
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { CreateSchoolProductCommand } from 'src/Application/School/Command/Product/CreateSchoolProductCommand';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { SchoolProductDTO } from '../../DTO/SchoolProductDTO';

@Controller('schools')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreateSchoolProductAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post(':id/products')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({summary: 'Assign a product to a specific school'})
  public async index(@Param() idDto: IdDTO, @Body() dto: SchoolProductDTO) {
    const { parentUnitPrice, photographerUnitPrice, productId } = dto;

    try {
      const id = await this.commandBus.execute(
        new CreateSchoolProductCommand(
          parentUnitPrice,
          photographerUnitPrice,
          idDto.id,
          productId
        )
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
