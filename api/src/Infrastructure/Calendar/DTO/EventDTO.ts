import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class EventDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  public date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public schoolId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public userId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public summary?: string;
}
