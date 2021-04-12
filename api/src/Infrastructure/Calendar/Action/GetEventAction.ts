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
import { GetEventByIdQuery } from 'src/Application/Calendar/Query/GetEventByIdQuery';
import { EventDetailView } from 'src/Application/Calendar/View/EventDetailView';
import { IQueryBus } from 'src/Application/IQueryBus';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';

@Controller('events')
@ApiTags('Calendar')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetEventAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Get event' })
  public async index(@Param() { id }: IdDTO): Promise<EventDetailView> {
    try {
      return await this.queryBus.execute(new GetEventByIdQuery(id));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
