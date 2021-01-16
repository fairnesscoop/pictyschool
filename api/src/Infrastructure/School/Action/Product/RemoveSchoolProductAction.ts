import {
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Param,
  Delete
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { RemoveSchoolProductCommand } from 'src/Application/School/Command/Product/RemoveSchoolProductCommand';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';

@Controller('schools/:schoolId/products')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class RemoveSchoolProductAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Delete(':id')
  @ApiOperation({summary: 'Remove school product'})
  public async index(@Param() { id }: IdDTO) {
    try {
      await this.commandBus.execute(new RemoveSchoolProductCommand(id));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
