import {
  Controller,
  Inject,
  Body,
  BadRequestException,
  UseGuards,
  Param,
  Put
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { UpdateSchoolProductCommand } from 'src/Application/School/Command/Product/UpdateSchoolProductCommand';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { UnitPriceDTO } from '../../DTO/UnitPriceDTO';

@Controller('schools/:schoolId/products')
@ApiTags('School product')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class UpdateSchoolProductAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: ' Edit school product unit price' })
  public async index(
    @Param() { id }: IdDTO,
    @Body() { parentUnitPrice, photographerUnitPrice }: UnitPriceDTO
  ) {
    try {
      await this.commandBus.execute(
        new UpdateSchoolProductCommand(id, parentUnitPrice, photographerUnitPrice)
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
