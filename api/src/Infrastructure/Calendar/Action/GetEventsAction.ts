import { Controller, Inject, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { UserRole } from 'src/Domain/User/User.entity';
import { EventView } from 'src/Application/Calendar/View/EventView';
import { GetEventsByPeriodQuery } from 'src/Application/Calendar/Query/GetEventsByPeriodQuery';
import { EventPeriodDTO } from '../DTO/EventPeriodDTO';

@Controller('events')
@ApiTags('Calendar')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetEventsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Get events by a range of dates' })
  public async index(
    @Query() { fromDate, toDate }: EventPeriodDTO,
  ): Promise<EventView> {
    return await this.queryBus.execute(
      new GetEventsByPeriodQuery(
        new Date(fromDate),
        new Date(toDate)
      )
    );
  }
}
