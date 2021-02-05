import {
  Controller,
  Inject,
  Post,
  Body,
  UnauthorizedException
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { PhotographerLoginQuery } from 'src/Application/User/Query/PhotographerLoginQuery';
import { PhotographerView } from 'src/Application/User/View/PhotographerView';
import { LoginDTO } from '../DTO/LoginDTO';

@Controller('login')
@ApiTags('Login')
export class PhotographerLoginAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Post('photographer')
  @ApiOperation({ summary: 'Photographer authentication' })
  public async index(@Body() { email, password }: LoginDTO): Promise<PhotographerView> {
    try {
      return await this.queryBus.execute(new PhotographerLoginQuery(email, password));
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
