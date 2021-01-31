import {
  Controller,
  Inject,
  Put,
  Body,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { IQueryBus } from 'src/Application/IQueryBus';
import { ProfileDTO } from '../DTO/ProfileDTO';
import { LoggedUser } from '../Decorator/LoggedUser';
import { UpdateProfileCommand } from 'src/Application/User/Command/UpdateProfileCommand';
import { PhotographerView } from 'src/Application/User/View/PhotographerView';
import { GetPhotographerByIdQuery } from 'src/Application/User/Query/GetPhotographerByIdQuery';
import { Roles } from '../Decorator/Roles';
import { RolesGuard } from '../Security/RolesGuard';
import { UserAuthView } from '../Security/UserAuthView';

@Controller('photographers')
@ApiTags('Photographer')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class UpdateMeAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Put('me')
  @Roles('photographer')
  @ApiOperation({ summary: 'Update current photographer' })
  public async index(
    @Body() dto: ProfileDTO,
    @LoggedUser() { id }: UserAuthView
  ): Promise<PhotographerView> {
    try {
      const { firstName, lastName, email, password } = dto;

      await this.commandBus.execute(
        new UpdateProfileCommand(id, firstName, lastName, email, password)
      );

      return await this.queryBus.execute(new GetPhotographerByIdQuery(id));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
