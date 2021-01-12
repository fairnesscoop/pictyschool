import {
  Controller,
  Inject,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Param,
  Put
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { UpdateSchoolProductCommand } from 'src/Application/School/Command/Product/UpdateSchoolProductCommand';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { UnitPriceDTO } from '../../DTO/UnitPriceDTO';

@Controller('schools')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class UpdateSchoolProductAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put('/:schoolId/products/:id')
  @ApiOperation({summary: 'Edit school product unit price'})
  public async index(@Param() { id }: IdDTO, @Body() { unitPrice }: UnitPriceDTO) {
    try {
      await this.commandBus.execute(
        new UpdateSchoolProductCommand(
          id,
          unitPrice
        )
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
