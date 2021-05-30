import { Controller, Inject, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { UserRole } from 'src/Domain/User/User.entity';
import { GetShippingCostsQuery } from 'src/Application/Order/Query/ShippingCost/GetShippingCostsQuery';
import { ShippingCostView } from 'src/Application/Order/View/ShippingCostView';

@Controller('shipping-costs')
@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetShippingCostsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({summary: 'Get all shipping costs'})
  public async index(): Promise<ShippingCostView[]> {
    return await this.queryBus.execute(new GetShippingCostsQuery());
  }
}
