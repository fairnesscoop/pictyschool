import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UserIdDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  public userId: string;
}
