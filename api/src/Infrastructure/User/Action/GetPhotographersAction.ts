import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetUsersByRoleQuery } from 'src/Application/User/Query/GetUsersByRoleQuery';
import { UserSummaryView } from 'src/Application/User/View/UserSummaryView';
import { UserRole } from 'src/Domain/User/User.entity';
import { Roles } from '../Decorator/Roles';
import { RolesGuard } from '../Security/RolesGuard';

@Controller('users')
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetPhotographersAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get('photographers')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Get photographers' })
  public async index(): Promise<UserSummaryView> {
    return await this.queryBus.execute(new GetUsersByRoleQuery(UserRole.PHOTOGRAPHER));
  }
}
