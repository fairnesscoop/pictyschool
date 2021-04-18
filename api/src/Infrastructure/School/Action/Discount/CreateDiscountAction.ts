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
import { CreateDiscountCommand } from 'src/Application/School/Command/Discount/CreateDiscountCommand';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { DiscountDTO } from '../../DTO/DiscountDTO';

@Controller('schools')
@ApiTags('School discount')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreateDiscountAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post(':id/discounts')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Create a discount' })
  public async index(
    @Param() idDto: IdDTO,
    @Body() { amount, value, type }: DiscountDTO
  ) {
    try {
      const id = await this.commandBus.execute(
        new CreateDiscountCommand(
          type,
          amount,
          value,
          idDto.id
        )
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
