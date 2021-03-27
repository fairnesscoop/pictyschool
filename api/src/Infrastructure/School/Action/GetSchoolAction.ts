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
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUser';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { UserAuthView } from 'src/Infrastructure/User/Security/UserAuthView';


@Controller('schools')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetSchoolAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id')
  @Roles(UserRole.PHOTOGRAPHER, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Get school' })
  public async index(
    @Param() dto: IdDTO,
    @LoggedUser() { id }: UserAuthView
  ): Promise<SchoolView> {
    try {
      return await this.queryBus.execute(new GetSchoolByIdQuery(dto.id, id));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
