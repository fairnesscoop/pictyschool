import {
  Body,
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Put,
  Param
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { UpdateProductCommand } from 'src/Application/Product/Command/UpdateProductCommand';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { ProductDTO } from '../DTO/ProductDTO';

@Controller('products')
@ApiTags('Product')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class UpdateProductAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id')
  @Roles('photographer')
  @ApiOperation({ summary: 'Update product' })
  public async index(@Param() idDto: IdDTO, @Body() dto: ProductDTO) {
    try {
      const { title, description, unitPrice } = dto;
      const id = await this.commandBus.execute(
        new UpdateProductCommand(idDto.id, title, unitPrice, description)
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
