import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolModule } from './Infrastructure/School/school.module';
import { UserModule } from './Infrastructure/User/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, SchoolModule],
  controllers: [],
  providers: []
})
export class AppModule {}
