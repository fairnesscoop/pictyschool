import {
  Controller,
  Inject,
  UseGuards,
  Param,
  Get,
  NotFoundException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetShippingCostByIdQuery } from 'src/Application/Order/Query/ShippingCost/GetShippingCostByIdQuery';
import { ShippingCostView } from 'src/Application/Order/View/ShippingCostView';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';

@Controller('shipping-costs')
@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetShippingCostAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Get shipping cost' })
  public async index(@Param() { id }: IdDTO): Promise<ShippingCostView> {
    try {
      return await this.queryBus.execute(new GetShippingCostByIdQuery(id));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
