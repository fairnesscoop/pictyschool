import { Controller, Inject, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LeadView } from 'src/Application/Lead/View/LeadView';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetLeadsQuery } from 'src/Application/Lead/Query/GetLeadsQuery';
import { Pagination } from 'src/Application/Common/Pagination';
import { PaginationDTO } from 'src/Infrastructure/Common/DTO/PaginationDTO';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { UserRole } from 'src/Domain/User/User.entity';

@Controller('leads')
@ApiTags('Lead')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetLeadsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({summary: 'Get all leads'})
  public async index(
    @Query() { page }: PaginationDTO,
  ): Promise<Pagination<LeadView>> {
    return await this.queryBus.execute(new GetLeadsQuery(page));
  }
}
