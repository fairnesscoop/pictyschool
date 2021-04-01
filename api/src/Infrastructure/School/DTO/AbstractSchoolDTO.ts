import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';
import { Status, Type } from 'src/Domain/School/AbstractSchool';

export abstract class AbstractSchoolDTO {
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
  @IsOptional()
  @IsEmail()
  public email: string;

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

  @ApiProperty({ enum: Status })
  @IsNotEmpty()
  @IsEnum(Status)
  public status: Status;

  @ApiProperty({ enum: Type })
  @IsNotEmpty()
  @IsEnum(Type)
  public type: Type;
}
