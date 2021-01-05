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
import { GetSchoolByIdQuery } from 'src/Application/School/Query/GetSchoolByIdQuery';
import { SchoolView } from 'src/Application/School/View/SchoolView';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';

@Controller('schools')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetSchoolAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get school' })
  public async index(@Param() dto: IdDTO): Promise<SchoolView> {
    try {
      return await this.queryBus.execute(new GetSchoolByIdQuery(dto.id));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
