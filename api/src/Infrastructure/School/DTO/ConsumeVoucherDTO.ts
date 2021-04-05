import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ConsumeVoucherDTO {
  @IsNotEmpty()
  @ApiProperty()
  public firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  public lastName: string;

  @IsNotEmpty()
  @ApiProperty()
  public password: string;
}
