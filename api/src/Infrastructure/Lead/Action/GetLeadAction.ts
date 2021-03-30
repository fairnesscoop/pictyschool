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
import { GetLeadByIdQuery } from 'src/Application/Lead/Query/GetLeadByIdQuery';
import { LeadView } from 'src/Application/Lead/View/LeadView';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';

@Controller('leads')
@ApiTags('Lead')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetLeadAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Get lead' })
  public async index(@Param() { id }: IdDTO): Promise<LeadView> {
    try {
      return await this.queryBus.execute(new GetLeadByIdQuery(id));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
