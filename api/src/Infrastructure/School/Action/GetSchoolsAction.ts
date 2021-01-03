import { Controller, Inject, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SchoolView } from 'src/Application/School/View/SchoolView';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetSchoolsQuery } from 'src/Application/School/Query/GetSchoolsQuery';
import { Pagination } from 'src/Application/Common/Pagination';
import { PaginationDTO } from 'src/Infrastructure/Common/DTO/PaginationDTO';

@Controller('schools')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetSchoolsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @ApiOperation({summary: 'Get all schools ordered by name'})
  public async index(
    @Query() { page }: PaginationDTO
  ): Promise<Pagination<SchoolView>> {
    return await this.queryBus.execute(new GetSchoolsQuery(page));
  }
}
