import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetPhotographerByIdQuery } from 'src/Application/User/Query/GetPhotographerByIdQuery';
import { PhotographerView } from 'src/Application/User/View/PhotographerView';
import { LoggedUser } from '../Decorator/LoggedUser';
import { Roles } from '../Decorator/Roles';
import { RolesGuard } from '../Security/RolesGuard';
import { UserAuthView } from '../Security/UserAuthView';

@Controller('photographers')
@ApiTags('Photographer')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetMeAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get('me')
  @Roles('photographer')
  @ApiOperation({ summary: 'Get current photographer' })
  public async index(@LoggedUser() { id }: UserAuthView): Promise<PhotographerView> {
    return await this.queryBus.execute(new GetPhotographerByIdQuery(id));
  }
}
