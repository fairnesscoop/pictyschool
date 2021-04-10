import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { DateGreaterOrEqualThan } from 'src/Infrastructure/Common/Validator/DateGreaterOrEqualThan';

export class EventDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  public fromDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @DateGreaterOrEqualThan('fromDate')
  public toDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public schoolId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public summary?: string;
}
