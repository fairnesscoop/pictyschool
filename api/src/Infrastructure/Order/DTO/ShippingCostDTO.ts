import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class ShippingCostDTO {
  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  public weight: number;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  public price: number;
}
