import {
  Controller,
  Inject,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Param
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { CreateSchoolProductCommand } from 'src/Application/School/Command/Product/CreateSchoolProductCommand';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { SchoolProductDTO } from '../../DTO/SchoolProductDTO';

@Controller('schools')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class CreateSchoolProductAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post(':id/products')
  @ApiOperation({summary: 'Assign a product to a specific school'})
  public async index(@Param() idDto: IdDTO, @Body() dto: SchoolProductDTO) {
    const { unitPrice, productId } = dto;

    try {
      const id = await this.commandBus.execute(
        new CreateSchoolProductCommand(
          unitPrice,
          idDto.id,
          productId,
        )
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
