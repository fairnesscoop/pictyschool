import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PhotographerView } from 'src/Application/User/View/PhotographerView';
import { Photographer } from 'src/Domain/User/Photographer.entity';
import { LoggedPhotographer } from '../Decorator/LoggedPhotographer';

@Controller('photographers')
@ApiTags('Photographer')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetMeAction {
  @Get('me')
  @ApiOperation({ summary: 'Get current photographer' })
  public async index(
    @LoggedPhotographer() photographer: Photographer
  ): Promise<PhotographerView> {
    return new PhotographerView(
      photographer.getId(),
      photographer.getFirstName(),
      photographer.getLastName(),
      photographer.getEmail()
    );
  }
}
