import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class ShippingCostDTO {
  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  public grams: number;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  public price: number;
}
