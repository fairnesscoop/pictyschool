import { Controller, Inject, UseGuards, Get, Param, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { UserRole } from 'src/Domain/User/User.entity';
import { GetSchoolUsersQuery } from 'src/Application/School/Query/User/GetSchoolUsersQuery';
import { SchoolUserView } from 'src/Application/School/View/SchoolUserView';
import { GetSchoolVouchersQuery } from 'src/Application/School/Query/Voucher/GetSchoolVouchersQuery';

@Controller('schools')
@ApiTags('School user')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetSchoolUsersAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id/users')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({summary: 'Get users and vouchers for a specific school'})
  public async index(@Param() { id }: IdDTO): Promise<SchoolUserView[]> {
    try {
      const [ users, vouchers ] = await Promise.all([
        this.queryBus.execute(new GetSchoolUsersQuery(id)),
        this.queryBus.execute(new GetSchoolVouchersQuery(id)),
      ]);

      return users.concat(vouchers);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
