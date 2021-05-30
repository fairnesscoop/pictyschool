import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateShippingCostCommandHandler } from 'src/Application/Order/Command/ShippingCost/CreateShippingCostCommandHandler';
import { GetShippingCostByIdQueryHandler } from 'src/Application/Order/Query/ShippingCost/GetShippingCostByIdQueryHandler';
import { GetShippingCostsQueryHandler } from 'src/Application/Order/Query/ShippingCost/GetShippingCostsQueryHandler';
import { ShippingCost } from 'src/Domain/Order/ShippingCost.entity';
import { IsShippingCostAlreadyExist } from 'src/Domain/Order/Specification/IsShippingCostAlreadyExist';
import { BusModule } from '../bus.module';
import { CreateShippingCostAction } from './Action/ShippingCost/CreateShippingCostAction';
import { GetShippingCostAction } from './Action/ShippingCost/GetShippingCostAction';
import { GetShippingCostsAction } from './Action/ShippingCost/GetShippingCostsAction';
import { ShippingCostRepository } from './Repository/ShippingCostRepository';

@Module({
  imports: [
    BusModule,
    TypeOrmModule.forFeature([
      ShippingCost
    ])
  ],
  controllers: [
    GetShippingCostsAction,
    CreateShippingCostAction,
    GetShippingCostAction
  ],
  providers: [
    { provide: 'IShippingCostRepository', useClass: ShippingCostRepository },
    IsShippingCostAlreadyExist,
    CreateShippingCostCommandHandler,
    GetShippingCostsQueryHandler,
    GetShippingCostByIdQueryHandler
  ]
})
export class OrderModule {}
