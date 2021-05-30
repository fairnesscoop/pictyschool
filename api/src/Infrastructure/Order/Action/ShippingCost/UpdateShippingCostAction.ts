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
import { UpdateShippingCostCommand } from 'src/Application/Order/Command/ShippingCost/UpdateShippingCostCommand';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { ShippingCostDTO } from '../../DTO/ShippingCostDTO';

@Controller('shipping-costs')
@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class UpdateShippingCostAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Update shipping cost' })
  public async index(@Param() idDto: IdDTO, @Body() dto: ShippingCostDTO) {
    try {
      const { price, grams } = dto;
      const id = await this.commandBus.execute(
        new UpdateShippingCostCommand(idDto.id, grams, price)
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
