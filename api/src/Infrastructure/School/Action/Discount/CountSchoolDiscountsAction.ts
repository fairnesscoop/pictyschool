import { Controller, Inject, UseGuards, Get, Param, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { CountDiscountsBySchoolQuery } from 'src/Application/School/Query/Discount/CountDiscountsBySchoolQuery';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';

@Controller('schools')
@ApiTags('School discount')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CountSchoolDiscountsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id/count-discounts')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Count school discounts' })
  public async index(@Param() { id }: IdDTO) {
    try {
      const total = await this.queryBus.execute(new CountDiscountsBySchoolQuery(id));

      return { total };
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
