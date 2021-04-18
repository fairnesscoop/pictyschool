import { Controller, Inject, UseGuards, Get, Param, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { UserRole } from 'src/Domain/User/User.entity';
import { DiscountView } from 'src/Application/School/View/DiscountView';
import { GetDiscountsBySchoolQuery } from 'src/Application/School/Query/Discount/GetDiscountsBySchoolQuery';

@Controller('schools')
@ApiTags('School discount')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetSchoolDiscountsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id/discounts')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Get school discounts' })
  public async index(@Param() dto: IdDTO): Promise<DiscountView[]> {
    try {
      return await this.queryBus.execute(new GetDiscountsBySchoolQuery(dto.id));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
