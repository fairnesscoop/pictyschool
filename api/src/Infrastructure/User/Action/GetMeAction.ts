import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetUserByIdQuery } from 'src/Application/User/Query/GetUserByIdQuery';
import { UserView } from 'src/Application/User/View/UserView';
import { UserRole } from 'src/Domain/User/User.entity';
import { LoggedUser } from '../Decorator/LoggedUser';
import { Roles } from '../Decorator/Roles';
import { RolesGuard } from '../Security/RolesGuard';
import { UserAuthView } from '../Security/UserAuthView';

@Controller('users')
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetMeAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get('me')
  @Roles(UserRole.PHOTOGRAPHER, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Get current user' })
  public async index(@LoggedUser() { id }: UserAuthView): Promise<UserView> {
    return await this.queryBus.execute(new GetUserByIdQuery(id));
  }
}
