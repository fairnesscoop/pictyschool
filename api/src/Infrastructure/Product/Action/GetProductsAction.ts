import { Controller, Inject, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ProductView } from 'src/Application/Product/View/ProductView';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetProductsQuery } from 'src/Application/Product/Query/GetProductsQuery';
import { Pagination } from 'src/Application/Common/Pagination';
import { PaginationDTO } from 'src/Infrastructure/Common/DTO/PaginationDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';

@Controller('products')
@ApiTags('Product')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetProductsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles('user')
  @ApiOperation({summary: 'Get all products ordered by title'})
  public async index(
    @Query() { page }: PaginationDTO
  ): Promise<Pagination<ProductView>> {
    return await this.queryBus.execute(new GetProductsQuery(page));
  }
}
