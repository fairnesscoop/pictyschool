import {
  Controller,
  Inject,
  Post,
  Body,
  UnauthorizedException
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { UserLoginQuery } from 'src/Application/User/Query/UserLoginQuery';
import { UserView } from 'src/Application/User/View/UserView';
import { LoginDTO } from '../DTO/LoginDTO';

@Controller('login')
@ApiTags('Login')
export class UserLoginAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Post()
  @ApiOperation({ summary: 'User authentication' })
  public async index(@Body() { email, password }: LoginDTO): Promise<UserView> {
    try {
      return await this.queryBus.execute(new UserLoginQuery(email, password));
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
