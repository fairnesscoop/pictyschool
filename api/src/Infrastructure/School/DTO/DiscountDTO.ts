import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsPositive } from 'class-validator';
import { DiscountType } from 'src/Domain/School/Discount.entity';

export class DiscountDTO {
  @ApiProperty({ enum: DiscountType })
  @IsNotEmpty()
  @IsEnum(DiscountType)
  public type: DiscountType;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  public amount: number;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  public value: number;
}
