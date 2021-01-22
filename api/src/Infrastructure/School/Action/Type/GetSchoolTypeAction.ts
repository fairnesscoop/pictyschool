import {
  Controller,
  Inject,
  UseGuards,
  Param,
  Get,
  NotFoundException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetSchoolTypeByIdQuery } from 'src/Application/School/Query/Type/GetSchoolTypeByIdQuery';
import { SchoolTypeView } from 'src/Application/School/View/SchoolTypeView';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';

@Controller('school-types')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetSchoolTypeAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get school type' })
  public async index(@Param() { id }: IdDTO): Promise<SchoolTypeView> {
    try {
      return await this.queryBus.execute(new GetSchoolTypeByIdQuery(id));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
