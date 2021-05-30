import { Controller, Inject, UseGuards, Get, Param, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { UserRole } from 'src/Domain/User/User.entity';
import { GetShootingsBySchoolQuery } from 'src/Application/School/Query/Shooting/GetShootingsBySchoolQuery';
import { ShootingSummaryView } from 'src/Application/School/View/ShootingSummaryView';

@Controller('schools')
@ApiTags('School shooting')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetSchoolShootingsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id/shootings')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Get school shootings' })
  public async index(@Param() dto: IdDTO): Promise<ShootingSummaryView[]> {
    try {
      return await this.queryBus.execute(new GetShootingsBySchoolQuery(dto.id));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
