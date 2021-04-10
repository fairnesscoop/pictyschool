import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarModule } from './Infrastructure/Calendar/calendar.module';
import { LeadModule } from './Infrastructure/Lead/lead.module';
import { ProductModule } from './Infrastructure/Product/product.module';
import { SchoolModule } from './Infrastructure/School/school.module';
import { UserModule } from './Infrastructure/User/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    SchoolModule,
    ProductModule,
    LeadModule,
    CalendarModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
