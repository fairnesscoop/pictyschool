import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class LeadDTO {
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

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  public phoneNumber: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  public numberOfStudents: number;
}
