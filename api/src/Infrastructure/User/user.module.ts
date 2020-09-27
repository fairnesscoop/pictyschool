import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Photographer} from 'src/Domain/User/Photographer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photographer])],
  controllers: [],
  providers: []
})
export class UserModule {}
