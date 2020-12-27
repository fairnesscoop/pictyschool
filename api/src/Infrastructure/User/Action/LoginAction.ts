import {
  Controller,
  Inject,
  Post,
  Body,
  UnauthorizedException
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { LoginQuery } from 'src/Application/User/Query/LoginQuery';
import { AuthenticatedView } from 'src/Application/User/View/AuthenticatedView';
import { LoginDTO } from '../DTO/LoginDTO';

@Controller('login')
@ApiTags('Photographer')
export class LoginAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Post()
  @ApiOperation({summary: 'Photographer authentication'})
  public async index(@Body() { email, password }: LoginDTO): Promise<AuthenticatedView> {
    try {
      return await this.queryBus.execute(
        new LoginQuery(email, password)
      );
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
