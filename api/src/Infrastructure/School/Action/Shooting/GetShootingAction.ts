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
import { GetShootingByIdQuery } from 'src/Application/School/Query/Shooting/GetSchootingByIdQuery';
import { ShootingView } from 'src/Application/School/View/ShootingView';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';

@Controller('schools/:schoolId/shootings')
@ApiTags('School shooting')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetShootingAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Get shooting' })
  public async index(@Param() { id }: IdDTO): Promise<ShootingView> {
    try {
      return await this.queryBus.execute(new GetShootingByIdQuery(id));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
