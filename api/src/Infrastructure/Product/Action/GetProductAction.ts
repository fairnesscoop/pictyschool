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
import { GetProductByIdQuery } from 'src/Application/Product/Query/GetProductByIdQuery';
import { ProductView } from 'src/Application/Product/View/ProductView';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';

@Controller('products')
@ApiTags('Product')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetProductAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Get product' })
  public async index(@Param() dto: IdDTO): Promise<ProductView> {
    try {
      return await this.queryBus.execute(new GetProductByIdQuery(dto.id));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
