import { Controller, Inject, UseGuards, Get, Param, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { CountSchoolProductsQuery } from 'src/Application/School/Query/Product/CountSchoolProductsQuery';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';

@Controller('schools')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class CountSchoolProductsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id/count-products')
  @ApiOperation({ summary: 'Count products for a specific school' })
  public async index(@Param() { id }: IdDTO): Promise<any> {
    try {
      const total = await this.queryBus.execute(new CountSchoolProductsQuery(id));

      return { total };
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
