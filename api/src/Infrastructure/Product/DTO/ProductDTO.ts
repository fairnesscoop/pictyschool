import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class ProductDTO {
  @IsNotEmpty()
  @ApiProperty()
  public title: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  public unitPrice: number;
}
