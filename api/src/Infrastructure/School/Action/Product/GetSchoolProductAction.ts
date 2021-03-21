import {
  Controller,
  Inject,
  UseGuards,
  Param,
  Get,
  NotFoundException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetSchoolProductByIdQuery } from 'src/Application/School/Query/Product/GetSchoolProductByIdQuery';
import { SchoolProductView } from 'src/Application/School/View/SchoolProductView';
import { UserRole } from 'src/Domain/User/User.entity';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';

@Controller('schools/:schoolId/products')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetSchoolProductAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Get school product' })
  public async index(@Param() { id }: IdDTO): Promise<SchoolProductView> {
    try {
      return await this.queryBus.execute(new GetSchoolProductByIdQuery(id));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
