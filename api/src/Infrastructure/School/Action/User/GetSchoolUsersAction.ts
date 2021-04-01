import { Controller, Inject, UseGuards, Get, Param, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { UserRole } from 'src/Domain/User/User.entity';
import { GetSchoolUsersQuery } from 'src/Application/School/Query/User/GetSchoolUsersQuery';
import { UserSummaryView } from 'src/Application/User/View/UserSummaryView';

@Controller('schools')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetSchoolUsersAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id/users')
  @Roles(UserRole.PHOTOGRAPHER, UserRole.DIRECTOR)
  @ApiOperation({summary: 'Get users for a specific school'})
  public async index(@Param() dto: IdDTO): Promise<UserSummaryView[]> {
    try {
      return await this.queryBus.execute(new GetSchoolUsersQuery(dto.id));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
