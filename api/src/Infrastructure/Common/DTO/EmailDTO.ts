import {
  IsEmail,
  IsNotEmpty
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  public email: string;
}
