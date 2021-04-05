import {
  Controller,
  Inject,
  Post,
  Body,
  BadRequestException,
  Param
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { CreateUserCommand } from 'src/Application/User/Command/CreateUserCommand';
import { UserView } from 'src/Application/User/View/UserView';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetVoucherByCodeQuery } from 'src/Application/School/Query/Voucher/GetVoucherByCodeQuery';
import { VoucherView } from 'src/Application/School/View/VoucherView';
import { ConsumeVoucherDTO } from '../../DTO/ConsumeVoucherDTO';
import { UserRole } from 'src/Domain/User/User.entity';
import { RemoveVoucherCommand } from 'src/Application/School/Command/Voucher/RemoveVoucherCommand';

@Controller('vouchers')
@ApiTags('School voucher')
export class ConsumeVoucherAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Post(':code/consume')
  @ApiOperation({ summary: 'Consume voucher' })
  public async index(
    @Param() code: string,
    @Body() { firstName, lastName, password }: ConsumeVoucherDTO
  ): Promise<UserView> {
    try {
      const voucher: VoucherView = await this.queryBus.execute(new GetVoucherByCodeQuery(code));
      if (!voucher) {
        return;
      }

      await this.commandBus.execute(
        new CreateUserCommand(
          firstName,
          lastName,
          voucher.email,
          password,
          UserRole.DIRECTOR
        )
      );

      await this.commandBus.execute(new RemoveVoucherCommand(voucher.id));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
