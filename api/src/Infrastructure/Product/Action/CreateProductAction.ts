import {
  Controller,
  Inject,
  Post,
  Body,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { CreateProductCommand } from 'src/Application/Product/Command/CreateProductCommand';
import { ProductDTO } from '../DTO/ProductDTO';

@Controller('products')
@ApiTags('Product')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class CreateProductAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new product' })
  public async index(@Body() dto: ProductDTO) {
    const { title, description, unitPrice } = dto;

    try {
      const id = await this.commandBus.execute(
        new CreateProductCommand(title, description, unitPrice)
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
