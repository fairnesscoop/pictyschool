import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarModule } from './Infrastructure/Calendar/calendar.module';
import { OrderModule } from './Infrastructure/Order/order.module';
import { IngestionModule } from './Infrastructure/Ingestion/ingestion.module';
import { ProductModule } from './Infrastructure/Product/product.module';
import { SchoolModule } from './Infrastructure/School/school.module';
import { UserModule } from './Infrastructure/User/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    SchoolModule,
    ProductModule,
    OrderModule,
    CalendarModule
    CalendarModule,
    IngestionModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
