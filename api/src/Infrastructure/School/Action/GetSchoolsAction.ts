import { Controller, Inject, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SchoolView } from 'src/Application/School/View/SchoolView';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetSchoolsQuery } from 'src/Application/School/Query/GetSchoolsQuery';
import { Pagination } from 'src/Application/Common/Pagination';
import { PaginationDTO } from 'src/Infrastructure/Common/DTO/PaginationDTO';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { UserRole } from 'src/Domain/User/User.entity';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUser';
import { UserAuthView } from 'src/Infrastructure/User/Security/UserAuthView';

@Controller('schools')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetSchoolsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.PHOTOGRAPHER, UserRole.DIRECTOR)
  @ApiOperation({summary: 'Get all schools'})
  public async index(
    @Query() { page }: PaginationDTO,
    @LoggedUser() { id, role }: UserAuthView
  ): Promise<Pagination<SchoolView>> {
    return await this.queryBus.execute(new GetSchoolsQuery(page, id, role));
  }
}
