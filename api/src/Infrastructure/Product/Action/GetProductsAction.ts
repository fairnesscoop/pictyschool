import { Controller, Inject, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ProductView } from 'src/Application/Product/View/ProductView';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetProductsQuery } from 'src/Application/Product/Query/GetProductsQuery';
import { Pagination } from 'src/Application/Common/Pagination';
import { PaginationDTO } from 'src/Infrastructure/Common/DTO/PaginationDTO';

@Controller('products')
@ApiTags('Product')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetProductsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @ApiOperation({summary: 'Get all products ordered by title'})
  public async index(
    @Query() { page }: PaginationDTO
  ): Promise<Pagination<ProductView>> {
    return await this.queryBus.execute(new GetProductsQuery(page));
  }
}
