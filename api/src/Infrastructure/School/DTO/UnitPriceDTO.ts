import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class UnitPriceDTO {
  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  public parentUnitPrice: number;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  public photographerUnitPrice: number;
}
