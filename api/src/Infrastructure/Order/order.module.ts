import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateShippingCostCommandHandler } from 'src/Application/Order/Command/ShippingCost/CreateShippingCostCommandHandler';
import { ShippingCost } from 'src/Domain/Order/ShippingCost.entity';
import { IsShippingCostAlreadyExist } from 'src/Domain/Order/Specification/IsShippingCostAlreadyExist';
import { BusModule } from '../bus.module';
import { CreateShippingCostAction } from './Action/ShippingCost/CreateShippingCostAction';
import { ShippingCostRepository } from './Repository/ShippingCostRepository';

@Module({
  imports: [
    BusModule,
    TypeOrmModule.forFeature([
      ShippingCost
    ])
  ],
  controllers: [CreateShippingCostAction],
  providers: [
    { provide: 'IShippingCostRepository', useClass: ShippingCostRepository },
    IsShippingCostAlreadyExist,
    CreateShippingCostCommandHandler
  ]
})
export class OrderModule {}
