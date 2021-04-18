import { Controller, Inject, UseGuards, Get, Param, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { CountShootingsBySchoolQuery } from 'src/Application/School/Query/Shooting/CountShootingsBySchoolQuery';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';

@Controller('schools')
@ApiTags('School shooting')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CountSchoolShootingsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id/count-shootings')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Count school shootings' })
  public async index(@Param() { id }: IdDTO) {
    try {
      const total = await this.queryBus.execute(new CountShootingsBySchoolQuery(id));

      return { total };
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
