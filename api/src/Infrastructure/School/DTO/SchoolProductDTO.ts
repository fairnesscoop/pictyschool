import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

export class SchoolProductDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  public productId: string;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  public unitPrice: number;
}
