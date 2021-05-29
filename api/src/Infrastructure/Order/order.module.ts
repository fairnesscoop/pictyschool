import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingCost } from 'src/Domain/Order/ShippingCost.entity';
import { BusModule } from '../bus.module';
import { ShippingCostRepository } from './Repository/Repository/ShippingCostRepository';

@Module({
  imports: [
    BusModule,
    TypeOrmModule.forFeature([
      ShippingCost
    ])
  ],
  controllers: [],
  providers: [
    { provide: 'IShippingCostRepository', useClass: ShippingCostRepository },
  ]
})
export class OrderModule {}
