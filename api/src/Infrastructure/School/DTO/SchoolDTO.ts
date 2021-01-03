import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class SchoolDTO {
  @IsNotEmpty()
  @ApiProperty()
  public reference: string;

  @IsNotEmpty()
  @ApiProperty()
  public name: string;

  @ApiProperty()
  @IsNotEmpty()
  public address: string;

  @ApiProperty()
  @IsNotEmpty()
  public city: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(6)
  public zipCode: string;
}
