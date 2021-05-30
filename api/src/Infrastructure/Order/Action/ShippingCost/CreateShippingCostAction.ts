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
import { CreateShippingCostCommand } from 'src/Application/Order/Command/ShippingCost/CreateShippingCostCommand';
import { UserRole } from 'src/Domain/User/User.entity';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { ShippingCostDTO } from '../../DTO/ShippingCostDTO';

@Controller('shipping-costs')
@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreateShippingCostAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Create new shipping cost' })
  public async index(@Body() dto: ShippingCostDTO) {
    const { grams, price } = dto;

    try {
      const id = await this.commandBus.execute(
        new CreateShippingCostCommand(grams, price)
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
