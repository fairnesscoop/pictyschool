import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsUUID, MaxLength } from 'class-validator';

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

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public schoolTypeId: string;

  @ApiPropertyOptional()
  @IsOptional()
  public phoneNumber: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  public numberOfStudents: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  public numberOfClasses: number;

  @ApiPropertyOptional()
  @IsOptional()
  public observation: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  public pdv: string;
}
