import { Controller, Inject, UseGuards, Get, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { SchoolTypeView } from 'src/Application/School/View/SchoolTypeView';
import { GetSchoolTypesQuery } from 'src/Application/School/Query/Type/GetSchoolTypesQuery';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';

@Controller('school-types')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetSchoolTypesAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles('user')
  @ApiOperation({ summary: 'Get school types' })
  public async index(): Promise<SchoolTypeView[]> {
    try {
      return await this.queryBus.execute(new GetSchoolTypesQuery());
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
